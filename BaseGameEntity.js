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
    ent_Elsa : 2,
    ent_Big_Joe : 3,
}

var location_type = {
    shack : 1,
    goldmine : 2,
    bank : 3,
    saloon : 4 
}

function GetNameOfLocation(l) {
    switch(l) {
        case location_type.shack:return "Shack";break;
        case location_type.goldmine:return "Goldmine";break;
        case location_type.bank:return "Bank";break;
        case location_type.saloon:return "Saloon";break;
    }
}

function GetNameOfEntity(n) {
    switch(n) {
        case names.ent_Miner_Bob:
            return "Miner Bob";
            break;
        case names.ent_Elsa:
            return "Elsa";
            break;
        case names.ent_Big_Joe:
            return "Big Joe";
            break;
        default:
            return "UNKNOWN!";
    }
}
