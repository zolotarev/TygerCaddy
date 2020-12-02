import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { rebuildCaddyfile } from "../middlewares/caddy";
import { Cert } from "../entity/Cert";
const path = require('path');
const rimraf = require('rimraf');
const fs = require('fs');
class CertController {
  static listAll = async (req: Request, res: Response) => {
    //Get Certs from database
    const certRepository = getRepository(Cert);
    const certs = await certRepository.find();

    //Send the certs object
    return res.send(certs);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the cert from database
    const certRepository = getRepository(Cert);
    try {
      const cert = await certRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).send("Cert not found");
    }
  };

  static newCert = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name } = req.body;

    if(!req.files) {
      return res.status(400).send("res");
  } else {
    let pem_file = req.files.pem_file;
    let cert_file = req.files.cert_file;
    let nameString = name.replace(/[^A-Z0-9]/ig, "_");
    var directory = path.resolve(__dirname, '../../db/certs/' + nameString)
    console.log(directory)
    if (fs.existsSync(directory)) {
        console.log('Cert Directory exists!');
    } else {
        console.log('Directory not found. Creating it now. ');
        fs.mkdir(directory, { recursive: true }, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
            }
        })
    }
    let pem_directory = directory + "/" + pem_file.name
    let cert_directory = directory + "/" + cert_file.name
    pem_file.mv(pem_directory)
    cert_file.mv(cert_directory)
    let cert = new Cert();
    cert.name = name;
    cert.cert_path = cert_directory;
    cert.pem_path = pem_directory;

    //Validade if the parameters are ok
    const errors = await validate(cert);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    //Try to save. If fails, the appname is already in use
    const certRepository = getRepository(Cert);
    try {
      await certRepository.save(cert);
    } catch (e) {
      return res.status(409).send({error:"Cert already in use"});
    }

    //If all ok, send 201 response
    return res.status(201).send("Cert created");
  }

    
  };

  static editCert = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let { name, cert_path, pem_path } = req.body;
    if(!req.files) {
      return res.status(400).send("Error uploading files");
  } else {
 //Try to find cert on database
 const certRepository = getRepository(Cert);
 let newCert;
 try {
   newCert = await certRepository.findOneOrFail(id, {
     relations: ["address"],
   });
 } catch (error) {
   //If not found, send a 404 response
   return res.status(404).send("Cert not found");
 }
 //Validate the new values on model
 let nameString = name.replace(/[^A-Z0-9]/ig, "_");
 var directory = "/tygercaddy/backend/db/certs/" + nameString
 if (fs.existsSync(directory)) {
  console.log('Cert Directory exists!');
} else {
  console.log('Directory not found. Creating it now. ');
  fs.mkdir(directory, { recursive: true }, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log("New directory successfully created.")
      }
  })
}
let pem_file = req.files.pem_file;
let cert_file = req.files.cert_file;
let pem_directory = directory + "/" + pem_file.name
let cert_directory = directory + "/" + cert_file.name
pem_file.mv(pem_directory)
cert_file.mv(cert_directory)
let cert = new Cert();
cert.name = name;
cert.cert_path = cert_directory;
cert.pem_path = pem_directory;
 newCert.name = name;
 newCert.cert_path = cert_path;
 newCert.pem_path = pem_path;
 const errors = await validate(newCert);
 if (errors.length > 0) {
   return res.status(400).send(errors);
 }

 //Try to safe, if fails, that means certname already in use
 try {
   await certRepository.save(newCert);
   if (newCert.address.length !== 0) {
     console.log("New Caddyfile Needed!");
     await rebuildCaddyfile();
   }
 } catch (e) {
   return res.status(409).send("Cert already in use");
 }
 //After all send a 204 (no content, but accepted) response
 return res.status(204).send();
  }
   

    
  };

  static deleteCert = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const certRepository = getRepository(Cert);
    let cert: Cert;
    try {
      cert = await certRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).send("Cert not found");
    }
    let nameString = cert.name.replace(/[^A-Z0-9]/ig, "_");
    var directory = path.resolve(__dirname, '../../db/certs/' + nameString)
    if(fs.existsSync(directory)){
      rimraf(directory, (error) => {
        if(error){
          console.log(error)
        } else {
          console.log("Certificates Deleted")
        }
      })
      certRepository.delete(id);
    //After all send a 204 (no content, but accepted) response
    return res.status(204).send();
    } else {
      return res.status(400).send("There was an error deleting the certificates");
    }
    

    
  };
}

export default CertController;
