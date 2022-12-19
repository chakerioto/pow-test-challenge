export interface BaseType {
    index: string;
    name: string;
    url: string;
}
export interface Damage {
    damage_type: BaseType;
}

export interface Spell {
    index: string;
    level: number;
    attack_type?: string;
    casting_time: string;
    classes: BaseType[];
    components: string[];
    concentration: boolean;
    url: string;
    ritual: boolean;
    damage: Damage;
    desc: string[];
    duration: string;
    higher_level: string[];
    material: string;
    name: string;
    range: string;
    school: BaseType;
    subclasses: BaseType[];
}
