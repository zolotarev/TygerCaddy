module.exports = {
branches: [
        {name: 'master'},
        {name: 'dev', prerelease: true}, // `prerelease` is built with the template `${name.replace(/^pre\\//g, "")}`
        {name: 'test', prerelease: true}, // `prerelease` is set to `beta` as it is the value of `name`
      ],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/gitlab",
        ["@semantic-release/exec", {
            "prepareCmd": "echo ${nextRelease.version} > VERSION.txt"
            }],
    ]
  };