# 2GETHER Website

This project is for serving the 2GETHER website!

2GETHER is a french association under the french law of 1901.  
See its website at [2gether-asso.fr](https://2gether-asso.fr).


## Getting started

### Development

Use this command to run the site locally for development:

```sh
docker compose watch
# or: docker compose up -d
```

Using `watch`, you'll benefit from file changes watching for sync & rebuild.

Use [DockerC](https://github.com/matiboux/dockerc) for shortened commands: `dockerc - @w`.

The site will be available at [http://localhost:8080](http://localhost:8080).


### Production

Use this command to run the site locally for production:

```sh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
# or: docker compose -f docker-compose.yml up -d
```

Use [DockerC](https://github.com/matiboux/dockerc) for shortened commands: `dockerc prod`.

The site will be available at [http://localhost:8080](http://localhost:8080).


## License

Licensed under the [MIT License](LICENSE).  
Copyright 2022 [Matiboux](https://matiboux.me).


## Credits

Layout is based on [mhyfritz/astro-landing-page](https://github.com/mhyfritz/astro-landing-page) (MIT License, Copyright 2022 Markus Hsi-Yang Fritz).
