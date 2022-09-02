#!/bin/bash

printf "\n> Instalando o front-end\n"
frontFolder="./front-mettzer"
npm_config_loglevel=silent npm i --prefix ${frontFolder}

printf "\n> Instalando o back-end\n"
backFolder="./back-mettzer"
npm_config_loglevel=silent npm i --prefix ${backFolder}