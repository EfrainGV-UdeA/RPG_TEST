window.EntityRace = {
    human: "human",
    elf: "elf",
    dwarf: "dwarf",
    goblin: "goblin",
    shadow_kin: "shadow"
}

window.Entities = {
    "npcShadowBandit": {
        name: "Shadow Bandit",
        race: EntityRace.shadow_kin,
        src: "assets/sprites/NPC_ShadowBandit.png",
        icon: "assets/sprites/iconBad.png",
        actions: ["damage1"],
    },
    "npcHumanRed": {
        name: "Human",
        race: EntityRace.human,
        src: "assets/sprites/NPC_HumanRed.png",
        icon: "assets/sprites/iconGood.png",
        actions: ["entangledStatus", "damage1", "blessedStatus"],
    },
    "npcPriest": {
        name: "Priest",
        race: EntityRace.elf,
        src: "assets/sprites/PriestPlayer.png",
        icon: "assets/sprites/iconGood.png",
        actions: ["damage1"],
    }
}