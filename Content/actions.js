window.Actions = {
    damage1: {
        name: "Punch",
        description: "You punch the enemy",
        success: [
            { type: "textMessage", text: "{CASTER} {ACTION}ed {TARGET}"},
            /* { type: "animation", animation: "WIP"}, */
            { type: "stateChange", damage: 10},
        ] 
    },
    blessedStatus: {
        name: "Healing bonus",
        targetType: "friendly",
        description: "Cast a self healing status",
        success: [
            { type: "textMessage", text: "{CASTER} blessed himself with a {ACTION}"},
            /* { type: "animation", animation: "WIP"}, */
            { type: "stateChange", status: { type: "blessed", expiresIn: 3}},
        ] 
    },
    entangledStatus: {
        name: "Entangle",
        description: "Entangle the enemy",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}"},
            /* { type: "animation", animation: "WIP"}, */
            { type: "stateChange", status: { type: "entangled", expiresIn: 3}},
            { type: "textMessage", text: "{TARGET} is {ACTION}d"},
        ] 
    },
    item_cleansingPotion: {
        name: "Potion of cleansing",
        description: "Drink this to clear statuses",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses a {ACTION}"},
            { type: "stateChange", status: null },
            { type: "textMessage", text: "You feel renewed"},
        ]
    },
    item_healingPotion: {
        name: "Potion of healing",
        description: "Drink this to recover hp",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses a {ACTION}"},
            { type: "stateChange", recover: 25 },
            { type: "textMessage", text: "It tastes healthy"},
        ]
    },
}