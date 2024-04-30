const fs = require('fs');
const path = require('path');

const fileName = 'dbLocation.json';
const filePath = path.join(__dirname, '..', 'database', fileName);

class LocationModel {
    static async getLocation() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        this.writeLocationToFile([]).then(resolve).catch(reject);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    static async writeLocationToFile(location) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(location), (err) => {
                if (err) reject(err);
                console.log(`Data written to file: ${filePath}`);
                resolve(this.getAllLocations());
            });
        });
    }

    static async getAllLocations() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        resolve([]);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    static async getLocationByName(nome) {
        return new Promise((resolve, reject) => {
            this.getLocation().then(locations => {
                const existingLocation = locations.find(location => location.nome === nome);
                resolve(existingLocation);
            }).catch(reject);
        });
    }

    static async createLocation(nome, sigla, bairro) {
        return new Promise((resolve, reject) => {
            this.getLocation().then(locations => {
                const existingLocation = locations.find(location => location.nome === nome);
                if (existingLocation) {
                    reject(new Error('Local já cadastrado'));
                    return;
                }
                const newLocation = { nome, sigla, bairro };
                locations.push(newLocation);
                this.writeLocationToFile(locations).then(resolve).catch(reject);
            }).catch(reject);
        });
    }
}

module.exports = LocationModel;
