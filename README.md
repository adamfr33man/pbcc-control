# pbcc-control

This is an app to control/automate things at PBCC. For a start it will allow control of OBS.

## Prerequisites

### OBS

To setup OBS for it to be able to be controlled, you must first install obs-websocket, which is a generic plugin that allows control of OBS from other apps/devices.

**Make sure you get version 5.0.0 beta1**

For now this is using version 5.0.0 beta1 which you can download from here the [releases page](https://github.com/obsproject/obs-websocket/releases/tag/5.0.0-beta1) releases.

Once installed, setup a password which you will need later.

## Downloads

Built releases of this repo should be available on the releases page

## Development

To build & package this, you'll needd NodeJS 16+ and yarn(install with `npm i -g yarn` after you have Node) installed.

Install dependancies, this is a one off or whenever packages have been updated.

```
yarn && cd client && yarn && cd .. && cd server && yarn && cd ..
```

Depending on what you are working on, you can run this is either the client or server directory and it shoulf hot reload. When working on the server, it will use the last compiled version of the client.

```
yarn dev
```

### Running the dev servers

At the moment, the most important thing is to run the client OBS webserver. It takes a bit of manual setup but I guess we can improve that as time goes on. Run

```
yarn start:client
```

Then goto localhost or an IP that looks local to you. Next you have to enter the IP of the serve you want to connect to for controlling OBS. Don't forget to fill in the right port number and password. You should be all good after that.
