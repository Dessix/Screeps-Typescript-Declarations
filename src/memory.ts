interface CreepMemory { }
interface FlagMemory { }
interface RoomMemory { }
interface SpawnMemory { }

interface Memory {
    creeps: { [creepName: string]: CreepMemory | undefined };
    flags: { [flagName: string]: FlagMemory | undefined };
    rooms: { [roomName: string]: RoomMemory | undefined };
    spawns: { [spawnName: string]: SpawnMemory | undefined };
}
