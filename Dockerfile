FROM node:14.6.0

# TODO install from workdirectory
RUN npm install @nodosjs/cli@0.0.45 --global

WORKDIR /out

CMD ["nodos"]
