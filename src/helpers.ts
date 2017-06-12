interface GlobalControlLevel {
    level: number;
    progress: number;
    progressTotal: number;
}

interface CPU {
    limit: number;
    tickLimit: number;
    bucket: number;

    /**
     * Get amount of CPU time used from the beginning of the current game tick. Always returns 0 in the Simulation mode.
     */
    getUsed(): number;
}

/**
 * An array describing the creep’s body. Each element contains the following properties:
 */
interface BodyPartDefinition {
    /**
     * If the body part is boosted, this property specifies the mineral type which is used for boosting. One of the RESOURCE_* constants.
     */
    readonly boost: string;
    /**
     * One of the body part types constants.
     */
    readonly type: BODYPART;
    /**
     * The remaining amount of hit points of this body part.
     */
    readonly hits: number;
}

declare type DescribeExitsResult = {
    "1"?: string;
    "3"?: string;
    "5"?: string;
    "7"?: string;
};

interface Owner {
    readonly username: string;
}
interface ReservationDefinition {
    readonly username: string;
    ticksToEnd: number;
}
interface SignDefinition {
    readonly username: string;
    readonly text: string;
    readonly time: number;
    readonly datetime: Date;
}
interface StoreDefinition {
    readonly [resource: string]: number | undefined;
    readonly energy?: number;
    readonly power?: number;
}

interface LookAtResultWithPos {
    x: number;
    y: number;
    type: string;
    constructionSite?: ConstructionSite;
    creep?: Creep;
    terrain?: string;
    structure?: Structure;
    flag?: Flag;
    energy?: Resource;
    exit?: any;
    source?: Source;
    mineral?: Mineral;
    resource? : Resource;
}
interface LookAtResult {
    type: string;
    constructionSite?: ConstructionSite;
    creep?: Creep;
    energy?: Resource;
    exit?: any;
    flag?: Flag;
    source?: Source;
    structure?: Structure;
    terrain?: string;
    mineral?: Mineral;
    resource?: Resource;
}

interface SpawningSpec {
    /**
     * The name of a new creep.
     */
    name: string;
    /**
     * Time needed in total to complete the spawning.
     */
    needTime: number;
    /**
     * Remaining time to go.
     */
    remainingTime: number;
};

interface LookAtResultMatrix {
    [coord: number]: LookAtResultMatrix|LookAtResult[]
}

interface FindOpts<T> {
    filter: LodashStringFilterFor<T>;
}

interface FindPathOpts {
    /**
     * Treat squares with creeps as walkable. Can be useful with too many moving creeps around or in some other cases. The default
     * value is false.
     */
    ignoreCreeps?: boolean;

    /**
     * Treat squares with destructible structures (constructed walls, ramparts, spawns, extensions) as walkable. Use this flag when
     * you need to move through a territory blocked by hostile structures. If a creep with an ATTACK body part steps on such a square,
     * it automatically attacks the structure. The default value is false.
     */
    ignoreDestructibleStructures?: boolean;

    /**
     * Ignore road structures. Enabling this option can speed up the search. The default value is false.
     * This is only used when the new PathFinder is enabled.
     */
    ignoreRoads?: boolean;

    /**
     * You can use this callback to modify a CostMatrix for any room during the search. The callback accepts two arguments, roomName
     * and costMatrix. Use the costMatrix instance to make changes to the positions costs. If you return a new matrix from this callback,
     * it will be used instead of the built-in cached one. This option is only used when the new PathFinder is enabled.
     *
     * @param roomName The name of the room.
     * @param costMatrix The current CostMatrix
     * @returns The new CostMatrix to use
     */
    costCallback?(roomName: string, costMatrix: CostMatrix): boolean | CostMatrix;

    /**
     * @deprecated Use {costCallback} instead
     * An array of the room's objects or RoomPosition objects which should be treated as walkable tiles during the search. This option
     * cannot be used when the new PathFinder is enabled (use costCallback option instead).
     */
    ignore?: RoomObject[] | RoomPosition[];

    /**
     * @deprecated Use {costCallback} instead
     * An array of the room's objects or RoomPosition objects which should be treated as obstacles during the search. This option cannot
     * be used when the new PathFinder is enabled (use costCallback option instead).
     */
    avoid?: RoomObject[] | RoomPosition[];

    /**
     * The maximum limit of possible pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU.
     * The default value is 2000.
     */
    maxOps?: number;

    /**
     * Weight to apply to the heuristic in the A* formula F = G + weight * H. Use this option only if you understand the underlying
     * A* algorithm mechanics! The default value is 1.2.
     */
    heuristicWeight?: number;

    /**
     * If true, the result path will be serialized using Room.serializePath. The default is false.
     */
    serialize?: boolean;

    /**
     * The maximum allowed rooms to search. The default (and maximum) is 16. This is only used when the new PathFinder is enabled.
     */
    maxRooms?: number;

    /**
     * Path to within (range) tiles of target tile. The default is to path to the tile that the target is on (0).
     */
    range?: number;
}

interface MoveToOpts extends FindPathOpts {
    /**
     * This option enables reusing the path found along multiple game ticks. It allows to save CPU time, but can result in a slightly
     * slower creep reaction behavior. The path is stored into the creep's memory to the _move property. The reusePath value defines
     * the amount of ticks which the path should be reused for. The default value is 5. Increase the amount to save more CPU, decrease
     * to make the movement more consistent. Set to 0 if you want to disable path reusing.
     */
    reusePath?: number;

    /**
     * If reusePath is enabled and this option is set to true, the path will be stored in memory in the short serialized form using
     * Room.serializePath. The default value is true.
     */
    serializeMemory?: boolean;

    /**
     * If this option is set to true, moveTo method will return ERR_NOT_FOUND if there is no memorized path to reuse. This can
     * significantly save CPU time in some cases. The default value is false.
     */
    noPathFinding?: boolean;

    /**
     * Draw a line along the creep’s path using RoomVisual.poly. You can provide either an empty object or custom style parameters.
     */
    visualizePathStyle?: PolyStyle;
};

interface PathStep {
    x: number;
    dx: number;
    y: number;
    dy: number;
    direction: DIRECTION;
}

interface FindRouteResult {
    /**
     * Exit direction
     */
    exit: FIND_EXIT_TOP | FIND_EXIT_RIGHT | FIND_EXIT_BOTTOM | FIND_EXIT_LEFT;
    /**
     * Name of the room
     */
    room: string;
}

/**
 * An object with survival game info
 */
interface SurvivalGameInfo {
    /**
     * Current score.
     */
    readonly score: number;
    /**
     * Time to the next wave of invaders.
     */
    readonly timeToWave: number;
    /**
     * The number of the next wave.
     */
    readonly wave: number;
}

interface _Constructor<T> {
    readonly prototype: T;
}

interface _ConstructorById<T> extends _Constructor<T> {
    new (id: string): T;
    (id: string): T;
}

declare type LodashFilterCallback<T> = ((element: T) => boolean);

declare type LodashFilterObjectFor<T> = {
    [P in keyof T]?: T[P];
};

declare type LodashFilterFor<T> = LodashFilterCallback<T> | LodashFilterObjectFor<T>;
declare type LodashStringFilterFor<T> = LodashFilterFor<T> | string;
