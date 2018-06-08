export class Config {
  get(property){
    return this.getConfig()[property];
  }

  getConfig(){
    if(process.env.NODE_ENV==='production'){
      return prod;
    }
    return dev;
  }
}

const dev = {
  QUEST_BACKEND_HOST: 'http://127.0.0.1:8080'
};

const prod = {
  QUEST_BACKEND_HOST: "http://quest" + window.location.href.split("quest-client")[1]
};
