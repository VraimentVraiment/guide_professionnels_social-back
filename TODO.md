# TODO

- Backend interface
  - Render 'caracteristiques_dispositif' and 'types_dispositif' as tree in directus once feature is available
    (currently in discussion: [https://github.com/directus/directus/discussions/3054])
  - Improve notification recipients selection methods
- Backend code
  - Improve migrations :
    - add translations,
    - add permissions,
    - add mock data
  - Right now email templates are hardcoded to be translated in french (in /extensions/templates). Directus might implement email translation in the future (see [https://github.com/directus/directus/discussions/8239])
  - Replace custome extension "autocomplete-alt-main" with native directus feature if available (see [https://github.com/directus/directus/discussions/10128#discussioncomment-4649071] and [https://github.com/rickysullivan/autocomplete-alt])

## WARNING
- Our custom extension "autocomplete-alt-main" does not work if built with latest dependencies