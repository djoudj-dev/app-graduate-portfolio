module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'chore', 'hotfix', 'release', 'update', 'dependencies']
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 50],
    'body-leading-blank': [2, 'always'],
    'subject-full-stop': [0]
  }
};
