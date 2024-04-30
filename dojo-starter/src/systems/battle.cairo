fn calculate_stats(lvl: u16, hp: u16, atk: u16, def: u16, spa: u16, spd: u16, spe: u16) {
    // formula for HP 
    let hp_lvl: u16 = ((2 * hp + 28 + 1) * lvl / 100 + lvl + 10);
    // for stats other than HP is Stat = floor(floor((2 * B + I + E) * L / 100 + 5) * N)
    let atk_lvl: u16 = (((2 * atk + 4 + 1) * lvl / 100 + lvl + 10) * 1);
    let def_lvl: u16 = (((2 * def + 17 + 1) * lvl / 100 + lvl + 10) * 1);
    let spa_lvl: u16 = (((2 * spa + 30 + 1) * lvl / 100 + lvl + 10) * 1);
    let spd_lvl: u16 = (((2 * spd + 27 + 1) * lvl / 100 + lvl + 10) * 1);
    let spe_lvl: u16 = (((2 * spe + 31 + 1) * lvl / 100 + lvl + 10) * 1);
}
