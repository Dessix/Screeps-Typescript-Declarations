// Updated 2016-02-05
/**
 * Spawns are your colony centers. You can transfer energy into it and create new creeps using createCreep() method.
 */
interface __StructureSpawn extends OwnedStructure {
    readonly prototype: StructureSpawn;
    /**
     * The amount of energy containing in the spawn.
     */
    readonly energy: number;
    /**
     * The total amount of energy the spawn can contain
     */
    readonly energyCapacity: number;
    /**
     * A shorthand to Memory.spawns[spawn.name]. You can use it for quick access the spawn’s specific memory data object.
     */
    memory?: SpawnMemory;
    /**
     * Spawn’s name. You choose the name upon creating a new spawn, and it cannot be changed later. This name is a hash key to access the spawn via the Game.spawns object.
     */
    readonly name: string;
    /**
     * If the spawn is in process of spawning a new creep, this object will contain the new creep’s information, or null otherwise.
     * @param name The name of a new creep.
     * @param needTime Time needed in total to complete the spawning.
     * @param remainingTime Remaining time to go.
     */
    readonly spawning: SpawningSpec | null;

    /**
     * Check if a creep can be created.
     * @param body An array describing the new creep’s body. Should contain 1 to 50 elements with one of these constants: WORK, MOVE, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
     * @param name The name of a new creep. It should be unique creep name, i.e. the Game.creeps object should not contain another creep with the same name (hash key). If not defined, a random name will be generated.
     */
    canCreateCreep(body: BODYPART[], name?: string): OK | ERR_NOT_OWNER | ERR_NAME_EXISTS | ERR_BUSY | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;
    /**
     * Start the creep spawning process.
     * The name of a new creep or one of these error codes
     * ERR_NOT_OWNER	-1	You are not the owner of this spawn.
     * ERR_NAME_EXISTS	-3	There is a creep with the same name already.
     * ERR_BUSY	-4	The spawn is already in process of spawning another creep.
     * ERR_NOT_ENOUGH_ENERGY	-6	The spawn and its extensions contain not enough energy to create a creep with the given body.
     * ERR_INVALID_ARGS	-10	Body is not properly described.
     * ERR_RCL_NOT_ENOUGH	-14	Your Room Controller level is not enough to use this spawn.
     * @param body An array describing the new creep’s body. Should contain 1 to 50 elements with one of these constants: WORK, MOVE, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
     * @param name The name of a new creep. It should be unique creep name, i.e. the Game.creeps object should not contain another creep with the same name (hash key). If not defined, a random name will be generated.
     * @param memory The memory of a new creep. If provided, it will be immediately stored into Memory.creeps[name].
     */
    createCreep(body: BODYPART[], name?: string, memory?: CreepMemory): string | ERR_NOT_OWNER | ERR_NAME_EXISTS | ERR_BUSY | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;
    /**
     * Kill the creep and drop up to 100% of resources spent on its spawning and boosting depending on remaining life time. The target should be at adjacent square.
     * @param target The target creep object.
     */
    recycleCreep(target: Creep): OK | ERR_NOT_OWNER | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE;
    /**
     * Increase the remaining time to live of the target creep. The target should be at adjacent square. The spawn should not be busy with the spawning process. Each execution increases the creep's timer by amount of ticks according to this formula: floor(500/body_size). Energy required for each execution is determined using this formula: ceil(creep_cost/3/body_size).
     * @param target The target creep object.
     */
    renewCreep(target: Creep): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_TARGET | ERR_FULL | ERR_NOT_IN_RANGE;
    /**
     * @deprecated
     * Transfer the energy from the spawn to a creep.
     * @param target The creep object which energy should be transferred to.
     * @param amount The amount of energy to be transferred. If omitted, all the remaining amount of energy will be used.
     */
    transferEnergy(target: Creep, amount?: number): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_TARGET | ERR_FULL | ERR_NOT_IN_RANGE;
}

interface StructureSpawn extends __StructureSpawn { }

interface StructureSpawnConstructor extends _Constructor<StructureSpawn>, _ConstructorById<StructureSpawn> {
}

declare const StructureSpawn: StructureSpawnConstructor;
