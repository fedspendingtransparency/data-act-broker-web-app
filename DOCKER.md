# Docker Quick Start
-----

For the OSx folks

- Installing docker is [easy](https://www.docker.com/docker-engine)

- Make sure your daemon is linked to your vm 

```bash
eval $(docker-machine env default)
```
- Once your docker daemon is alive, you can build an image

```bash
cd projectRootDirectory
docker build -t node/run .
```

- After the image is built you can run it

```bash
docker run -t -p 3000:3000 node/run
```

# Docker next steps
-----

The current docker file is nice for just getting up and running, but could
be better for developers and the pipeline.

- find a nice way to mount code on the host to the container for more
consistent dev builds

- find a way for the pipeline to run each job against a container
instead of the jenkins host
