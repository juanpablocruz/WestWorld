function EntityMap() {
    this.memoria = {};
}

EntityMap.prototype.insert = function(id,obj) {
    this.memoria[id] = obj;
}
EntityMap.prototype.find = function(id) {
    return this.memoria[id];
}
EntityMap.prototype.erase = function(id) {
    delete this.memoria[id];
}

function EntityManager() {
    this.m_EntityMap = new EntityMap();
        
}

EntityManager.prototype.RegisterEntity = function(NewEntity) {
    this.m_EntityMap.insert(NewEntity.ID(),NewEntity);
}

EntityManager.prototype.GetEntityFromId = function(id) {
    return this.m_EntityMap.find(id);
}

EntityManager.prototype.RemoveEntity = function(pEntity) {
    this.m_EntityMap.erase(this.m_EntityMap.find(pEntity.ID()));
}

var entityManager = new EntityManager();