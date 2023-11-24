window.Actions = {
    damage1: {
        name: "Punch",
        //type:
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}"},
            /* { type: "animation", animation: "WIP"}, */
            { type: "stateChange", damage: 10},
        ] 
    },
    blessedStatus: {
        name: "Healing bonus",
        targetType: "friendly",
        //type:
        success: [
            { type: "textMessage", text: "{CASTER} blessed himself with a {ACTION}"},
            /* { type: "animation", animation: "WIP"}, */
            { type: "stateChange", status: { type: "blessed", expiresIn: 3}},
        ] 
    },
    entangledStatus: {
        name: "Entangle",
        //type:
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}"},
            /* { type: "animation", animation: "WIP"}, */
            { type: "stateChange", status: { type: "entangled", expiresIn: 3}},
            { type: "textMessage", text: "{TARGET} is {ACTION}d"},
        ] 
    },
}