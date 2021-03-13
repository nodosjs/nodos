FROM node:14.6.0

# TODO install from workdirectory
RUN npm install @nodosjs/cli@0.0.44 --global

CMD ["nodos"]
