var m_iNextValidID = 0;

function BaseGameEntity(id) {
    this.m_ID;
    this.setID(id);
    
}

BaseGameEntity.prototype.setID = function(val) {
    this.m_ID = val;
    m_iNextValidID = this.m_ID + 1;
};
BaseGameEntity.prototype.update = function(){}
BaseGameEntity.prototype.HandleMessage = function(msg){}
BaseGameEntity.prototype.ID = function() {return this.m_ID;}


var names = {
    ent_Miner_Bob : 1,
    ent_Elsa : 2
}

var location_type = {
    shack : 1,
    goldmine : 2,
    bank : 3,
    saloon : 4 
}

function GetNameOfEntity(n) {
    switch(n) {
        case names.ent_Miner_Bob:
            return "Miner Bob";
            break;
        case names.ent_Elsa:
            return "Elsa";
            break;
        default:
            return "UNKNOWN!";
    }
}