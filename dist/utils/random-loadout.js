"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combinations = [
    'large, small',
    'medium, medium',
    'medium, small',
    'small, small'
];
const largeWeapons = [
    'Bomb Lance',
    'Caldwell Rival 78',
    'Crossbow',
    'Crown & King Auto-5',
    'Lebel 1886',
    'Lebel 1886 Marksman',
    'Lebel 1886 Talon',
    'Martini-Henry IC1',
    'Martini-Henry IC1 Deadeye',
    'Martini-Henry IC1 Marksman',
    'Martini-Henry IC1 Riposte',
    'Mosin Nagant M1891',
    'Mosin Nagant M1891 Avtomat',
    'Mosin Nagant M1891 Bayonet',
    'Mosin Nagant M1891 Sniper',
    'Nagant M1895 Officer Carbine',
    'Nagant M1895 Officer Carbine Deadeye',
    'Nitro Express Rifle',
    'Romero 77',
    'Romero 77 Talon',
    'Sparks LRR',
    'Sparks LRR Silencer',
    'Sparks LRR Sniper',
    'Specter 1882',
    'Specter 1882 Bayonet',
    'Springfield 1866',
    'Springfield 1866 Marksman',
    'Vetterli 71 Karabiner',
    'Vetterli 71 Karabiner Deadeye',
    'Vetterli 71 Karabiner Bayonet',
    'Winfield 1887 Terminus',
    'Winfield M1873',
    'Winfield M1873 Aperture',
    'Winfield M1873 Musket Bayonet',
    'Winfield M1873 Swift',
    'Winfield M1873 Talon',
    'Winfield M1873C',
    'Winfield M1873C Marksman',
    'Winfield M1873C Silencer',
    'Winfield M1876 Centennial',
    'Winfield M1876 Centennial Sniper',
    'Vetterli 71 Karabiner Marksman',
    'Vetterli 71 Karabiner Silencer',
    'Lebel 1886 Aperture'
];
const medWeapons = [
    'Bornheim No. 3 Match',
    'Caldwell Rival 78 Handcannon',
    'Combat Axe',
    'Dolch 96 Precision',
    'Mosin Nagant M1891 Obrez',
    'Mosin Nagant M1891 Obrez Mace',
    'Mosin Nagant M1891 Obrez Drum',
    'Nagant M1895 Deadeye',
    'Nagant M1895 Precision',
    'Romero 77 Handcannon',
    'Romero 77 Hatchet',
    'Specter 1882 Compact',
    'Springfield 1866 Compact',
    'Springfield 1866 Compact Striker',
    'Springfield 1866 Compact Deadeye',
    'Winfield 1887 Terminus Handcannon',
    'Winfield M1873C Vandal',
    'Winfield M1873C Vandal Striker',
    'Winfield M1873C Vandal Deadeye',
    'Hunting Bow'
];
const smallWeapons = [
    'Bornheim No. 3',
    'Bornheim No. 3 Extended',
    'Caldwell Conversion Chain Pistol',
    'Caldwell Conversion Pistol',
    'Caldwell Conversion Uppercut',
    'Caldwell Pax',
    'Caldwell Pax Claw',
    'Cavalry Saber',
    'Dolch 96',
    'Hand Crossbow',
    'Le Mat Mark II',
    'Machete',
    'Nagant M1895 ',
    'Nagant M1895 Silencer',
    'Nagant M1895 Officer',
    'Nagant M1895 Officer Brawler'
];
const dualWieldWeapons = [
    'Bornheim No. 3',
    'Bornheim No. 3 Extended',
    'Caldwell Conversion Chain Pistol',
    'Caldwell Conversion Pistol',
    'Caldwell Conversion Uppercut',
    'Caldwell Pax',
    'Caldwell Pax Claw',
    'Dolch 96',
    'Hand Crossbow',
    'Le Mat Mark II',
    'Nagant M1895',
    'Nagant M1895 Silencer',
    'Nagant M1895 Officer',
    'Nagant M1895 Officer Brawler'
];
const tools2 = [
    'Dusters',
    'Heavy Knife',
    'Knife',
    'Knuckle Knife',
    'Throwing Knives'
];
const tools3 = [
    'Alert Trip Mine',
    'Blank Fire Decoys',
    'Choke Bomb',
    'Concertina Trip Mine',
    'Decoy Fuses',
    'Decoys',
    'Electric Lamp',
    'Flare Pistol',
    'Fusees',
    'Poison Trip Mine',
    'Quad Derringer',
    'Spyglass'
];
const consumables1 = ['Weak Vitality Shot', 'Vitality Shot'];
const consumables2 = [
    'Ammo Box',
    'Antidote Shot',
    'Big Dynamite Bundle',
    'Chaos Bomb',
    'Concertina Bomb',
    'Dynamite Bundle',
    'Dynamite Stick',
    'Fire Bomb',
    'Flash Bomb'
];
const consumables3 = [
    'Frag Bomb',
    'Hellfire Bomb',
    'Hive Bomb',
    'Liquid Fire Bomb',
    'Poison Bomb',
    'Stamina Shot',
    'Sticky Bomb',
    'Waxed Dynamite Stick',
    'Weak Antidote Shot',
    'Stalker Beetle'
];
const getRandomLoadout = () => {
    const randomCombo = Math.round(Math.random() * (combinations.length - 1));
    let weapon1;
    let weapon2;
    const randomTools = [
        'First Aid Kit',
        tools2[Math.round(Math.random() * (tools2.length - 1))],
        tools3[Math.round(Math.random() * (tools3.length - 1))]
    ];
    const randomConsumables = [
        consumables1[Math.round(Math.random() * (consumables1.length - 1))],
        consumables2[Math.round(Math.random() * (consumables2.length - 1))],
        consumables3[Math.round(Math.random() * (consumables3.length - 1))]
    ];
    if (randomCombo === 0) {
        weapon1 =
            largeWeapons[Math.round(Math.random() * (largeWeapons.length - 1))];
        weapon2 =
            smallWeapons[Math.round(Math.random() * (smallWeapons.length - 1))];
    }
    if (randomCombo === 1) {
        const dualWeild1 = Math.round(Math.random() * 1) === 0 ? false : true;
        const dualWeild2 = Math.round(Math.random() * 1) === 0 ? false : true;
        if (dualWeild1) {
            weapon1 = `Dual wield: ${dualWieldWeapons[Math.round(Math.random() * (dualWieldWeapons.length - 1))]}`;
        }
        else {
            weapon1 = medWeapons[Math.round(Math.random() * (medWeapons.length - 1))];
        }
        if (dualWeild2) {
            weapon2 = `Dual wield: ${dualWieldWeapons[Math.round(Math.random() * (dualWieldWeapons.length - 1))]}`;
        }
        else {
            weapon2 = medWeapons[Math.round(Math.random() * (medWeapons.length - 1))];
        }
    }
    if (randomCombo === 2) {
        const dualWeild = Math.round(Math.random() * 1) === 0 ? false : true;
        if (dualWeild) {
            weapon1 = `Dual wield: ${dualWieldWeapons[Math.round(Math.random() * (dualWieldWeapons.length - 1))]}`;
        }
        else {
            weapon1 = medWeapons[Math.round(Math.random() * (medWeapons.length - 1))];
        }
        weapon2 =
            smallWeapons[Math.round(Math.random() * (smallWeapons.length - 1))];
    }
    if (randomCombo === 3) {
        weapon1 =
            smallWeapons[Math.round(Math.random() * (smallWeapons.length - 1))];
        weapon2 =
            smallWeapons[Math.round(Math.random() * (smallWeapons.length - 1))];
    }
    return `
    Loadout:
    ${weapon1},
    ${weapon2},
    ${randomTools[0]},
    ${randomTools[1]},
    ${randomTools[2]},
    ${randomConsumables[0]},
    ${randomConsumables[1]},
    ${randomConsumables[2]}
    `;
};
exports.default = getRandomLoadout;
