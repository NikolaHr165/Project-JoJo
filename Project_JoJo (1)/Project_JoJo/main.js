'use strict'

const game = new Phaser.Game(1090, 613, Phaser.AUTO, 'game-canvas', { preload, create, update})

let hp1, hp2 
let arena1
let map_all
let colision1
let kick_cooldown = 60
let punch_cooldown = 20
let slash_cooldown1 = 30
let slash_cooldown2 = 70
let slash_cooldown3 = 50
//stats
let move = 300
let jump = 400
let dive = 400
let knockback
//triggers
let Dio_trigger
let Dio_rangeX
let Dio_rangeY
let Tanjiro_rangeX
let Tanjiro_rangeY
let Inosuke_rangeX
let Inosuke_rangeY
//Jotaro
let TQatk = false 
let TEatk = false 
let DQatk = false 
let DEatk = false
let IQatk = false
let IEatk = false
//let Qatk2 = false
//let Eatk2 = false
let player
let jotpic
let jotaro_hp = 100
let Jsize = 1
let StarPlatinum = 500
let stand_counter = 0
let jotaro_jump = 0
let jotaro_punch = 0
let Jdash = 100
let Jdash_cd 
let jotaro_kick = 0
let Woosh_counter = 0
let WooshY_counter = 0
let StarPlatinum_cooldown = 0
//Dio
let dio
let AttackD
//Tnajiro
let tanjiro
let AttackT
let tanjiro_hp = 100
let tan_idle = 0
let Tsize = 1.2
let tan_slash1 = 0
let tan_slash2 = 0
let tan_slash3 = 0
let knockbackT
//PorkoDio
let inosuke_gr
let AttackI
let inosuke_hp = 30
let ino_idle = 0
let Isize = 1.1
let ino_slash1 = 0
let ino_slash2 = 0
let ino_slash3 = 0
let knockbackI
let ino_move = 4.5
let enemy_hp
//inosuke_dead
let ino_dead 

//let diopic
let Dsize = 1 
let dio_hp = 100
let The_World = 250
let The_World_cooldown = 0
let pose_counter = 0
let dio_jump = 0
let dio_punch = 0
let dio_kick = 0
//Dist
let max_kick_X, cur_kick_X, max_kick_Y, cur_kick_Y
let max_punch_X, cur_punch_X, max_punch_Y, cur_punch_Y
let cur_Drange_X, cur_Drange_Y
let cur_Trange_X, cur_Trange_Y
let max_Tpunch_X, cur_Tpunch_X, max_Tpunch_Y, cur_Tpunch_Y
let max_Ipunch_X, cur_Ipunch_X, max_Ipunch_Y, cur_Ipunch_Y
let cur_Irange_X, cur_Irange_Y
//Music
let tanslashaudio1
let tanslashaudio2
let tanslashaudio3
let diotheme
let jotarotheme
let warudo
let starplat
let roundabout
let punch
let ora
let muda
let Woosh
let WooshY
let zero
let bruh
let time_end
let witcher_ost
let yousayrun
let ibuki
//let dost = 0, jost = 0
let kaktheme
let counter = 0

function preload() {
game.load.image('JotaroWins', 'JotaroWins.png')
game.load.image('DioWins', 'DioWins.png')
//game.load.image('diopic', 'diopic.png')
game.load.image('jotpic', 'jotpic.png')
game.load.spritesheet('romaBG', 'roma_sprt1.jpg', 1090, 613)
game.load.spritesheet('jotaro', 'Jotarofinished_kappa.png', 630 / 10, 1319 / 20)
game.load.spritesheet('dio', 'dio.png', 650 /10 , 1738 /22)
game.load.spritesheet('tanjiro1','tanjiro_spritesheet.png', 102, 51)
game.load.spritesheet('inosuke1', 'inosuke_spritesheet.png', 95, 72)
game.load.audio('dio theme', 'dios theme.ogg')
game.load.audio('the world', 'Za Warudo 1.ogg')
game.load.audio('dio tp', 'dio_tp.ogg')
game.load.audio('jotaro theme', 'jotaro_ost.ogg')
game.load.audio('ora', 'ora.ogg')
game.load.audio('muda', 'muda.ogg')
game.load.audio('Star_Plat1', 'StarPlat_TW.ogg')
game.load.audio('punch', 'punch.ogg')
game.load.audio('round', 'Round.ogg')
game.load.audio('zero', 'zero.ogg')
game.load.spritesheet('health', 'health.png', 628, 1184 / 8)
game.load.audio('TE', 'brrr.ogg')
game.load.audio('Kakost', 'noble pope.ogg')
game.load.audio('Woosh', 'jotaro_dash.ogg')
game.load.audio('tanslashaudio1', 'slash_hit.ogg')
game.load.audio('tanslashaudio2', 'slash_miss1.ogg')
game.load.audio('tanslashaudio3', 'slash_miss2.ogg')
game.load.audio('ibuki1', 'ibuki.ogg')
game.load.audio('yousayrun1', 'yousayrun_pure.ogg')
game.load.audio('witcher_ost1', 'witcher_ost.ogg')

game.load.image('Minterior', 'Project2/interior.png')
game.load.image('Minterior3', 'Project2/interior3.png')
game.load.image('Mbuilding1', 'Project2/building1.png')
game.load.image('Mpod_brat', 'Project2/pod_brat.png')
game.load.image('Mbuilding2', 'Project2/building2.png')
game.load.image('Mjapaniq1', 'Project2/japaniq1.png')
game.load.image('Mtile_castle_grey', 'Project2/tile_castle_grey.png')
game.load.image('M32x32_tileset_ruins', 'Project2/32x32_tileset_ruins.png')
game.load.image('M32x32_tileset_marketplace', 'Project2/32x32_tileset_marketplace.png')
game.load.image('M32x32_tileset_terrains_shops', 'Project2/32x32_tileset_terrains_shops.png')
game.load.image('Mvikings', 'Project2/32x32_tileset_vikings_city.png')
game.load.image('Mwood2', 'Project2/M32x32_tileset_woodland 2.png')
game.load.image('fontan', 'ProjectM/fontan.png')

game.load.tilemap('map_all', 'ProjectM/mapp_all.json', null, Phaser.Tilemap.TILED_JSON)
game.load.image('building1V', 'ProjectM/building1.png')
game.load.image('building2V', 'ProjectM/building2.png')
game.load.image('ruinsV', 'ProjectM/32x32_tileset_ruins.png')
game.load.image('marketplaceV', 'ProjectM/32x32_tileset_marketplace.png')
game.load.image('shopsV', 'ProjectM/32x32_tileset_terrains_shops.png')
game.load.image('vikingsV', 'ProjectM/32x32_tileset_vikings_city.png')
game.load.image('japanV', 'ProjectM/32x32_japan.png')
game.load.image('japan1V', 'ProjectM/32x32_japan1.png')
game.load.image('hshopV', 'ProjectM/32x32_tileset_house_shop.png')
game.load.image('portV', 'ProjectM/32x32_tileset_old_port.png')
game.load.image('wood2V', 'ProjectM/32x32_tileset_woodland 2.png')
game.load.image('woodV', 'ProjectM/32x32_tileset_woodland.png')
game.load.image('celina2V', 'ProjectM/celianna_farm_old.png')
game.load.image('celina3V', 'ProjectM/celianna_farmnature_crops_fields.png')
game.load.image('celina4V', 'ProjectM/celianna_japanese.png')
game.load.image('jitoV', 'ProjectM/jito.png')
game.load.image('paoV', 'ProjectM/PathAndObjects.png')
}

function create() {
    game.world.setBounds(0, 0, 3200, 3584)
    map_all = game.add.tilemap('map_all', 32, 32, 100, 112)
    map_all.setCollisionByExclusion([])
    map_all.addTilesetImage('Minterior', 'Minterior')
    map_all.addTilesetImage('Minterior3', 'Minterior3')
    map_all.addTilesetImage('Mbuilding1', 'Mbuilding1')
    map_all.addTilesetImage('Mbuilding2', 'Mbuilding2')
    map_all.addTilesetImage('Mpod_brat', 'Mpod_brat')
    map_all.addTilesetImage('Mjapaniq1', 'Mjapaniq1')
    map_all.addTilesetImage('Mtile_castle_grey', 'Mtile_castle_grey')
    map_all.addTilesetImage('M32x32_tileset_ruins', 'M32x32_tileset_ruins')
    map_all.addTilesetImage('M32x32_tileset_marketplace', 'M32x32_tileset_marketplace')
    map_all.addTilesetImage('M32x32_tileset_terrains_shops', 'M32x32_tileset_terrains_shops')
    map_all.addTilesetImage('Mvikings', 'Mvikings')
    map_all.addTilesetImage('32x32_japan', 'japanV')
    map_all.addTilesetImage('32x32_japan1', 'japan1V')
    map_all.addTilesetImage('32x32_tileset_house_shop', 'hshopV')
    map_all.addTilesetImage('32x32_tileset_old_port', 'portV')
    map_all.addTilesetImage('32x32_tileset_woodland 2', 'wood2V')
    map_all.addTilesetImage('32x32_tileset_woodland', 'woodV')
    map_all.addTilesetImage('celianna_farm_old', 'celina2V')
    map_all.addTilesetImage('celianna_farmnature_crops_fields', 'celina3V')
    map_all.addTilesetImage('celianna_japanese', 'celina4V')
    map_all.addTilesetImage('jito', 'jitoV')
    map_all.addTilesetImage('PathAndObjects', 'paoV')
    map_all.addTilesetImage('32x32_tileset_vikings_city', 'vikingsV')
    map_all.addTilesetImage('32x32_tileset_marketplace', 'marketplaceV')
    map_all.addTilesetImage('building2', 'building2V')
    map_all.addTilesetImage('32x32_tileset_terrains_shops', 'shopsV')
    map_all.addTilesetImage('building1', 'building1V')
    map_all.addTilesetImage('32x32_tileset_ruins', 'ruinsV')
    map_all.addTilesetImage('fontan', 'fontan')
    
    map_all.createLayer("base")
    colision1 = map_all.createLayer(" collision 1")
    map_all.createLayer("bilding ideas")
    map_all.createLayer("kushti -3")
    map_all.createLayer("kushti -2")
    map_all.createLayer("kushti -1")
    map_all.createLayer("kushti")
    map_all.createLayer("kushti filler")
    JOTARO()
    TANJIRO()
    DIO()
    createInosuke()
    map_all.createLayer("kushti 1")
    map_all.createLayer("durveta pun")
    map_all.createLayer("kushti 2 ")
    map_all.createLayer("kushti 3")
    map_all.createLayer("jitce 1")
    map_all.createLayer("jitce 2")
    map_all.createLayer("collison 2")
    map_all.createLayer("durveta korona 1")
    map_all.createLayer("durveta korona 2")
    map_all.createLayer("durveta korona 3")
    OST()
    
    //inosuke_gr.enableBody = true
    //inosuke_gr.physicsBodyType = Phaser.Physics.ARCADE
    

    Jdash_cd = 0
    max_punch_X = player.width / 2 + dio.width / 2 - 50
    max_punch_Y = player.height / 2 + dio.height / 2
    max_kick_X = player.width / 2 + dio.width / 2 - 45
    max_kick_Y = player.height / 2 + dio.height / 2
    
    Dio_rangeX = player.width / 2 + dio.width / 2 + 200
    Dio_rangeY = player.height / 2 + dio.height / 2 + 200

    Tanjiro_rangeX = player.width / 2 + tanjiro.width / 2 + 200
    Tanjiro_rangeY = player.height / 2 + tanjiro.height / 2 + 200
    max_Tpunch_X = player.width / 2 + tanjiro.width / 2 - 50
    max_Tpunch_Y = player.height / 2 + tanjiro.height / 2

    
    Inosuke_rangeX = player.width / 2 + 95 / 2 + 200
    Inosuke_rangeY = player.height / 2 + 72 / 2 + 200
    max_Ipunch_X = player.width / 2 +  95 / 2 - 50
    max_Ipunch_Y = player.height / 2 + 72 / 2

    

    
    //INO_DEAD_CR()
    HEALTHBARJOTARO()
}

function update () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    hp2.x = player.x
    hp2.y = player.y - 40
    game.physics.arcade.collide(player, colision1)
    game.physics.arcade.collide(dio, colision1)
    //game.physics.arcade.collide()

    //console.log(player.x)
    //console.log(player.y)

    if(player.x >= 2623.5 && player.x <= 2656.5 && player.y === 480.975 && game.input.keyboard.addKey(Phaser.Keyboard.F).isDown){
        player.x = 530
        player.y = 2177
    }
    if(player.x >= 479.5 && player.x <= 576.5 && player.y === 2144.975 && game.input.keyboard.addKey(Phaser.Keyboard.F).isDown){
        player.x = 2642
        player.y = 498
    }
    if(player.x >= 319.5 && player.x <= 320.5 && player.y === 1376.975 && game.input.keyboard.addKey(Phaser.Keyboard.F).isDown){
        player.x = 380
        player.y = 3227
    }
    if(player.x >= 350 && player.x <= 415 && player.y === 3200.975 && game.input.keyboard.addKey(Phaser.Keyboard.F).isDown){
        player.x = 320
        player.y = 1392
    }
    if(player.x >= 600 && player.x <= 640 && player.y === 3423.025 && game.input.keyboard.addKey(Phaser.Keyboard.F).isDown && tanjiro_hp <= 0){
        player.x = 2655
        player.y = 2157
    }
    if(player.x >= 2635 && player.x <= 2685 && player.y === 2144.975 && game.input.keyboard.addKey(Phaser.Keyboard.F).isDown){
        player.x = 623
        player.y = 3410
    }
    
    //console.log(Inosuke_rangeX)
    if (Jdash < 100 && Jdash_cd >= 500){
        Jdash = 100
        Jdash_cd = 0
    } 
    if (Woosh_counter === 1){
        Woosh.play()
    }
    if (WooshY_counter === 1) {
        Woosh.play()
    }
    
     if (dio.x < player.x){
        knockback = -40
    } else knockback = 40
    if (tanjiro.x < player.x){
        knockbackT = -40
    } else knockbackT = 40

    //console.log(ino_idle)

    INOSUKE_UPDATE2()
    INOSUKE_UPDATE()
    JOTARO_ATK()
    DIO_ATK()
    TANJIRO_ATK()
    JOTARO_MOVE()
    DIO_MOVE()
    TANJIRO_MOVE()
    FIZIKI_JOTARO()
    FIZIKI_DIO()
    DMGJOTARO()
    CONTACTRIGHT()
    CONTACT()
    //STOPTIME()
    DEATH()
    //DMG_DIO()
    DIO_RANGE()
    TANJIRO_RANGE()
    FIZIKI_TANJIRO()
    OST_IF()

    
    jotaro_punch += 1
    jotaro_kick += 1
    stand_counter += 1
    StarPlatinum_cooldown += 1
    Jdash_cd += 1
    dio_punch += 1
    dio_kick += 1
    tan_idle += 1
    pose_counter += 1
    tan_slash1 += 1
    tan_slash2 += 1
    tan_slash3 += 1
    ino_slash1 += 1
    ino_slash2 += 1
    ino_slash3 += 1
    ino_idle += 1
    The_World_cooldown += 1

    if(dio_hp > 0){
       StarPlatinum += 1 
    }
    else StarPlatinum = 0

    if(jotaro_hp > 0){
        The_World += 1
    }
    else The_World = 0

    if (stand_counter > 10){
        player.animations.play('stand')
    }
    
    if (tan_idle > 10){
        tanjiro.animations.play('idle')    
    }
    
    if (pose_counter > 10){
        dio.animations.play('stand')    
    } 

    //if (jotaro_hp < 75 && !(cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y) && !(cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y )){
       // jotaro_hp += 0.015
      // }
       
//console.log(tanjiro_hp)

if (game.input.keyboard.addKey(Phaser.Keyboard.Q).isDown && cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y){
    DQatk = true
}else DQatk = false

if (game.input.keyboard.addKey(Phaser.Keyboard.Q).isDown && cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y){
    TQatk = true
}else TQatk = false 

if (game.input.keyboard.addKey(Phaser.Keyboard.E).isDown && cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y){
    DEatk = true
}else DEatk = false

if (game.input.keyboard.addKey(Phaser.Keyboard.E).isDown && cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y){
    TEatk = true
}else TEatk = false 



} 
//const BG = function(){
//bg = game.add.sprite(0, 0, 'romaBG')
    //bg.animations.add('warudo', [1], 60, true) 
    //bg.frame = 1
//diopic = game.add.image(250, 0, 'diopic')
//diopic.scale.setTo(0.3)
//jotpic = game.add.image(2, 1, 'jotpic')
//jotpic.scale.setTo(0.28)  
//}
//const INO_DEAD_CR = function(){
 //   ino_dead = game.add.group()
  //  game.physics.enable(ino_dead)
  //  ino_dead.enableBody
  //  ino_dead.inputEnableChildren
//
  //  inosuke_gr.forEach(function (dead){
  //      dead.animations.add('I_dead', [19, 20, 21], 6, false).play()
  //      dead.scale.setTo(1.6)
  //      dead.anchor.setTo(0.5)
       // dead.physics.enable(enemy)
  //      dead.body.collideWorldBounds = true 
 //  })
//}

const createInosuke = function(){
        inosuke_gr = game.add.group()
        game.physics.enable(inosuke_gr)
        inosuke_gr.enableBody
        inosuke_gr.inputEnableChildren
   
        inosuke_gr.create( 40, 332, 'inosuke1')
        inosuke_gr.create(1455, 128.975, 'inosuke1')
        inosuke_gr.create (1615, 812, 'inosuke1')
        inosuke_gr.create (605, 1435, 'inosuke1')
        inosuke_gr.create (1195, 1377, 'inosuke1')
        inosuke_gr.create (2450, 1272, 'inosuke1')
        inosuke_gr.create (2643.5, 663, 'inosuke1')
        inosuke_gr.create (2985.5, 1312, 'inosuke1')
        inosuke_gr.create (3200, 2000000, 'inosuke1')

        inosuke_gr.forEach(function (enemy) {
             enemy_hp = 50
            enemy.animations.add('ino_stand', [0,1,2,3,4], 6, true)
            enemy.animations.add('ino_run', [8,9,10,11], 10, true)
            enemy.animations.add('I_dead', [19, 20, 21], 6, false)
            enemy.animations.add('ino_poke', [40, 41, 42], 6, false)
            enemy.animations.add('ino_flurry', [48, 49, 50, 51, 52, 53], 10, false)
            enemy.animations.add('ino_flurry2', [56, 57, 58, 59], 8, false)
            enemy.scale.setTo(1.1)
            enemy.anchor.setTo(0.5)
            game.physics.enable(enemy)
           enemy.body.collideWorldBounds = true 
        })

    }

const INOSUKE_UPDATE = function (){
   
    let enemy = inosuke_gr.getClosestTo(player)
    //let enemy_dead = inosuke_gr.getClosestTo(player)
   
    
    enemy.collideWorldBounds = true
    game.physics.arcade.collide(enemy, colision1)
//range
    cur_Irange_X = enemy.x - player.x
    cur_Irange_Y = player.y - enemy.y

    if (cur_Irange_X < 0) cur_Irange_X *= -1
    if (cur_Irange_Y < 0) cur_Irange_Y *= -1
    
    cur_Ipunch_X = enemy.x - player.x
    cur_Ipunch_Y = player.y - enemy.y

    if (cur_Ipunch_X < 0) cur_Ipunch_X *= -1
    if (cur_Ipunch_Y < 0) cur_Ipunch_Y *= -1
//idle
    if (ino_idle > 10){
        enemy.animations.play('ino_stand')
    }
    


//cont Q and E

if (game.input.keyboard.addKey(Phaser.Keyboard.Q).isDown && cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y){
    IQatk = true
}else   IQatk = false

if (game.input.keyboard.addKey(Phaser.Keyboard.E).isDown && cur_Ipunch_X <= max_Tpunch_X && cur_Ipunch_Y <= max_Ipunch_Y){
    IEatk = true
}else   IEatk = false 

//move
    if (cur_Irange_X <= Inosuke_rangeX && enemy.x <= player.x - 30 && StarPlatinum > 250 && cur_Irange_Y <= Inosuke_rangeY && enemy_hp > 0){
        enemy.body.velocity.x = move
        enemy.animations.play('ino_run')
        ino_idle = 5
        enemy.scale.setTo(Isize)

    } else if (cur_Irange_X <= Inosuke_rangeX && enemy.x >= player.x + 30 && StarPlatinum > 250 && cur_Irange_Y <= Inosuke_rangeY && enemy_hp > 0) {
        enemy.body.velocity.x = -move
        enemy.animations.play('ino_run')
        ino_idle = 5
        enemy.scale.setTo(-Isize, Isize)
  
    } else {
        enemy.body.velocity.x = 0   
    }
    if (cur_Irange_Y <= Inosuke_rangeY && enemy.y <= player.y -10 && StarPlatinum > 250 && cur_Irange_X <= Inosuke_rangeX && enemy_hp > 0){
         enemy.body.velocity.y = move
         enemy.animations.play('ino_run')
        ino_idle = 5
   
    } 
    else if (cur_Irange_Y <= Inosuke_rangeY && enemy.y >= player.y +10 && StarPlatinum > 250 && cur_Irange_X <= Inosuke_rangeX && enemy_hp > 0){
        enemy.body.velocity.y = -move
        enemy.animations.play('ino_run')
        ino_idle = 5
    } else {
        enemy.body.velocity.y = 0
    }

//attack_random
if (cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y && StarPlatinum > 250 && enemy_hp > 0){
    AttackI = game.rnd.integerInRange(1, 3)
    //console.log('ok')
}

//attacks
    if (enemy.x > player.x){
        knockbackI = 40
    } else knockbackI = -40
if (cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackI === 1 && ino_slash1 > slash_cooldown1 && enemy_hp > 0) {
    //punch.play()
    //muda.play()
    tanslashaudio1.play()
    enemy.animations.play('ino_flurry2') 
    jotaro_hp -= 1
    //player.x -= knockback
    ino_slash1 = -3
    ino_idle = -10
    enemy.body.velocity.x = 0
    enemy.body.velocity.y = 0
}
if (cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackI === 2 && ino_slash2 > slash_cooldown2 && enemy_hp > 0) {
    //punch.play()
    //muda.play()
    tanslashaudio2.play()
    enemy.animations.play('ino_flurry') 
    jotaro_hp -= 1
    //player.x -= knockback
    ino_slash2 = -3
    ino_idle = -10 
    enemy.body.velocity.x = 0
    enemy.body.velocity.y = 0

}
if (cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackI === 3 && ino_slash3 > slash_cooldown3 && enemy_hp > 0) {
    //punch.play()
    //muda.play()
    tanslashaudio3.play()
    enemy.animations.play('ino_poke') 
    jotaro_hp -= 2
    //player.x -= knockback
    ino_slash3 = -3
    ino_idle = -10
    enemy.body.velocity.x = 0
    enemy.body.velocity.y = 0

}

//player attack Inosuke

if (cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y && IQatk === true && jotaro_punch > punch_cooldown && The_World > 250){
    console.log('punchDAMAGE')
    punch.play()
    ora.play()
    player.animations.play('punch') 
    enemy_hp -= 1
    enemy.x += knockbackI
    jotaro_punch = 0
    stand_counter = -5 
} else if (IQatk === true && jotaro_punch > punch_cooldown && The_World > 250){
    console.log('punch')
    ora.play()
    player.animations.play('punch')
    jotaro_punch = 0
    stand_counter = -5
}
 
if (cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y && IEatk === true && jotaro_kick > kick_cooldown && The_World > 250){
    console.log('kickDAMAGE')
    punch.play()
    ora.play()
    player.animations.play('kick') 
    enemy_hp -= 5
    enemy.x += knockbackI * 1.5
    jotaro_kick = 0
    stand_counter = -5 
} else if (IEatk === true && jotaro_kick > kick_cooldown && The_World > 250){
    console.log('kick')
    ora.play()
    player.animations.play('kick')
    jotaro_kick = 0
    stand_counter = -5
}
    // inosuke_death
if (enemy_hp <= 0 && enemy_hp >= -4){
    enemy.animations.play('I_dead')
    enemy_hp = - 5
    bruh = false
    enemy.destroy()
    //enemy.replace(enemy, enemy_dead)
    //roundabout.play()
    //kaktheme.stop()    
} else {
    bruh = true

}
    //once_dead_will_survive
    if (enemy_hp <= -5 
        //&& cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y
        && ((cur_Irange_X <= Inosuke_rangeX && enemy.x <= player.x - 40 && cur_Irange_Y <= Inosuke_rangeY )
        || (cur_Irange_X <= Inosuke_rangeX && enemy.x >= player.x + 40  && cur_Irange_Y <= Inosuke_rangeY )
        || (cur_Irange_Y <= Inosuke_rangeY && enemy.y <= player.y -20  && cur_Irange_X <= Inosuke_rangeX )
        || (cur_Irange_Y <= Inosuke_rangeY && enemy.y >= player.y +20  && cur_Irange_X <= Inosuke_rangeX ))
        ){
        enemy_hp = 50

}
    //console.log(jotaro_hp)
    if (jotaro_hp < 75 && !(cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y) && !(cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y) && !(cur_Ipunch_X <= max_Ipunch_X && cur_Ipunch_Y <= max_Ipunch_Y)){
        jotaro_hp += (0.025) * 2
       }
    //console.log(enemy_hp)    
}     

const INOSUKE_UPDATE2 = function (){
}

const CONTACT = function(_, ino){
}


const TANJIRO = function(){
    
    tanjiro = game.add.sprite(530, 2492, 'tanjiro1')
    tanjiro.animations.add('idle', [0, 1, 2], 6, true)
    tanjiro.animations.add('sword_draw', [21, 22, 23, 24, 25, 18], 9, false)
    tanjiro.animations.add('sword_idle', [18, 19, 20], 6, true)
    tanjiro.animations.add('T_dead',[38, 39, 37, 40, 41, 42], 10, false)
    tanjiro.animations.add('T_run', [9, 10, 11, 12, 13, 14, 15 ,16], 12, true)
    tanjiro.animations.add('ver_slash', [43, 44], 3, false)
    tanjiro.animations.add('hor_slash', [27, 27, 27, 28, 29, 30], 10, false)
    tanjiro.animations.add('poke', [ 31, 32, 33, 34], 10, false)
    tanjiro.animations.add('tan_win', [3, 4, 5, 6, 7, 8,], 10, false)
    tanjiro.scale.setTo(Tsize)
    tanjiro.anchor.setTo(0.5)
    game.physics.enable(tanjiro)
    
}
const FIZIKI_TANJIRO = function (){
    tanjiro.body.collideWorldBounds = true 
}

const TANJIRO_RANGE = function(){
    cur_Trange_X = tanjiro.x - player.x
    cur_Trange_Y = player.y - tanjiro.y 

    if (cur_Trange_X < 0) cur_Trange_X *= -1
    if (cur_Trange_Y < 0) cur_Trange_Y *= -1
}

const TANJIRO_MOVE = function(){
    if (cur_Trange_X <= Tanjiro_rangeX && tanjiro.x <= player.x - 40 && StarPlatinum > 250 && cur_Trange_Y <= Tanjiro_rangeY && tanjiro_hp > 0){
        tanjiro.body.velocity.x = 295
        tanjiro.animations.play('T_run')
        tan_idle = 5
        tanjiro.scale.setTo(Tsize)
    } else if (cur_Trange_X <= Tanjiro_rangeX && tanjiro.x >= player.x + 40 && StarPlatinum > 250 && cur_Trange_Y <= Tanjiro_rangeY && tanjiro_hp > 0) {
        tanjiro.body.velocity.x = -295
        tanjiro.animations.play('T_run')
        tan_idle = 5
        tanjiro.scale.setTo(-Tsize, Tsize)
   } else {
        tanjiro.body.velocity.x = 0   
   }
   if (cur_Trange_Y <= Tanjiro_rangeY && tanjiro.y <= player.y -20 && StarPlatinum > 250 && cur_Trange_X <= Tanjiro_rangeX && tanjiro_hp > 0){
        tanjiro.body.velocity.y = 295
        tanjiro.animations.play('T_run')
        tan_idle = 5
   } 
  else if (cur_Trange_Y <= Tanjiro_rangeY && tanjiro.y >= player.y +20 && StarPlatinum > 250 && cur_Trange_X <= Tanjiro_rangeX && tanjiro_hp > 0){
       tanjiro.body.velocity.y = -295
       tanjiro.animations.play('T_run')
       tan_idle = 5
   } else {
       tanjiro.body.velocity.y = 0
   }

   //if (game.input.keyboard.addKey(Phaser.Keyboard.G).isDown && StarPlatinum > 250) {
   // tanjiro.body.velocity.x = -move} 
}

const TANJIRO_ATK = function(){
    if (cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y && StarPlatinum > 250 && tanjiro_hp > 0){
        AttackT = game.rnd.integerInRange(1, 3)
    }
    if (cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackT === 1 && tan_slash1 > slash_cooldown1 && tanjiro_hp > 0) {
        //punch.play()
        //muda.play()
        tanslashaudio1.play()
        tanjiro.animations.play('ver_slash') 
        jotaro_hp -= 1
        //player.x -= knockback
        tan_slash1 = -3
        tan_idle = -10
        tanjiro.body.velocity.x = 0
        tanjiro.body.velocity.y = 0
    }
    if (cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackT === 2 && tan_slash2 > slash_cooldown2 && tanjiro_hp > 0) {
        //punch.play()
        //muda.play()
        tanslashaudio2.play()
        tanjiro.animations.play('hor_slash') 
        jotaro_hp -= 2
        //player.x -= knockback
        tan_slash2 = -3
        tan_idle = -10 
        tanjiro.body.velocity.x = 0
        tanjiro.body.velocity.y = 0

    }
    if (cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackT === 3 && tan_slash3 > slash_cooldown3 && tanjiro_hp > 0) {
        //punch.play()
        //muda.play()
        tanslashaudio3.play()
        tanjiro.animations.play('poke') 
        jotaro_hp -= 2.5
        //player.x -= knockback
        tan_slash3 = -3
        tan_idle = -10
        tanjiro.body.velocity.x = 0
        tanjiro.body.velocity.y = 0

    }
}

const DIO = function(){   
dio = game.add.sprite(2650, 2512, 'dio')
    dio.animations.add('flame', [121, 122, 123, 124, 125, 126, 127, 128, 129], 15, true)
    //dio.animations.add('za warudo', [0, 1, 2, 3], 6, true)
    dio.animations.add('walk', [116, 117, 118], 7, true)
    dio.animations.add('stand', [0, 1, 2, 3], 9, true)
    dio.animations.add('jump', [15, 16], 15, true) 
    dio.animations.add('punch', [75, 76, 77, 78], 20, false) 
    dio.animations.add('kick', [156, 157, 158, 159, 160], 20, false)
    dio.animations.add('deathDio', [33, 34, 35, 36, , 26, 27, 28], 10, false)
    dio.scale.setTo(Dsize)
    dio.anchor.setTo(0.5)
    game.physics.enable(dio)
}

const FIZIKI_DIO = function(){
    dio.body.collideWorldBounds = true  
}

const DIO_RANGE = function(){
    cur_Drange_X = dio.x - player.x
    cur_Drange_Y = player.y - dio.y

    if (cur_Drange_X < 0) cur_Drange_X *= -1
    if (cur_Drange_Y < 0) cur_Drange_Y *= -1
}

const DIO_MOVE = function(){
   if (cur_Drange_X <= Dio_rangeX && dio.x <= player.x -19 && StarPlatinum > 250 && cur_Drange_Y <= Dio_rangeY){
       dio.body.velocity.x = move
       dio.animations.play('walk')
       pose_counter = 5
       dio.scale.setTo(Dsize)
   } else if (cur_Drange_X <= Dio_rangeX && dio.x >= player.x +19 && StarPlatinum > 250 && cur_Drange_Y <= Dio_rangeY) {
       dio.body.velocity.x = -move
       dio.animations.play('walk')
       pose_counter = 5
       dio.scale.setTo(-Dsize, Dsize)
  } else {
      dio.body.velocity.x = 0   
  }
  if (cur_Drange_Y <= Dio_rangeY && dio.y <= player.y -6 && StarPlatinum > 250 && cur_Drange_X <= Dio_rangeX){
      dio.body.velocity.y = move
      dio.animations.play('walk')
       pose_counter = 5
  } 
 else if (cur_Drange_Y <= Dio_rangeY && dio.y >= player.y +6 && StarPlatinum > 250 && cur_Drange_X <= Dio_rangeX){
      dio.body.velocity.y = -move
      dio.animations.play('walk')
       pose_counter = 5
  } else {
      dio.body.velocity.y = 0
      
}
}

const DIO_ATK = function(){
    if (cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y && StarPlatinum > 250){
        AttackD = game.rnd.integerInRange(1, 2)
       // console.log(AttackD)
        
    }
    if (cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackD === 1 && dio_punch > punch_cooldown) {
        punch.play()
        muda.play()
        dio.animations.play('punch') 
        jotaro_hp -= 1
        //player.x -= knockback
        dio_punch = -3
        pose_counter = -5 
        dio.body.velocity.x = 0
        dio.body.velocity.y = 0
    } if (cur_kick_X <= max_kick_X && cur_kick_Y <= max_kick_Y && StarPlatinum > 250 && jotaro_hp > 0 && AttackD === 2 && dio_kick > kick_cooldown){
        punch.play()
        muda.play()
        dio.animations.play('kick') 
        jotaro_hp -= 2
        //player.x -= knockback * 2
        dio_kick = -5
        pose_counter = -5 
        dio.body.velocity.x = 0
        dio.body.velocity.y = 0
    } if (cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y && jotaro_hp > 0 && The_World_cooldown > 1000 && dio_hp > 0 && jotaro_hp > 0){
        The_World = 0
        The_World_cooldown = 0
        warudo.play()
        pose_counter = -5
    }
    if (The_World < 250 && jotaro_hp < 0){
        
        player.body.velocity.x = 0
        player.body.velocity.y = 0
    }
    else if (The_World < 250){
       
        player.body.velocity.x = 0
        player.body.velocity.y = 0   
    }
    else {player.body.immovable = false} 

}

const JOTARO = function(){
   
    player = game.add.sprite(1208, 932 ,'jotaro')
    player.scale.setTo(Jsize) 
    player.animations.add('buzz', [6, 7, 8, 9, 10, 11, 12, 13], 15, true)
    player.animations.add('dashJ', [14, 15], 15, true)
    player.animations.add('stand', [0, 1, 2, 3, 4, 5], 15, true)
    player.animations.add('jump', [144, 145, 146, 147, 148, 149, 150, 151], 15, true) 
    player.animations.add('punch', [95, 96, 97, 98, 99], 20, false) 
    player.animations.add('kick', [105, 106, 107, 108, 109], 15, false)
    player.animations.add('death', [37, 38, 39, 40, 30, 31, 32], 10, false)
    player.anchor.setTo(0.5)
    game.physics.enable(player)
    game.camera.follow(player)
}

const JOTARO_MOVE = function(){
    if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown && game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown && The_World > 250 && Jdash <= 100 && Jdash >= 0) {
        player.body.velocity.x = -move * 2
        player.animations.play('dashJ')
        player.scale.setTo(-Jsize, Jsize)
        stand_counter = 5
        Jdash -= 4.5
        Woosh_counter += 1
    } else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown && game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown && The_World > 250 && Jdash <= 100 && Jdash >= 0) {
        player.body.velocity.x = move * 2
        player.animations.play('dashJ')
        player.scale.setTo(Jsize)
        stand_counter = 5
        Jdash -= 4.5
        Woosh_counter += 1
     } else if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown && The_World > 250) {
        player.body.velocity.x = -move 
        player.animations.play('buzz')
        player.scale.setTo(-Jsize, Jsize)
        stand_counter = 5 
        
    } else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown && The_World > 250) {
        player.body.velocity.x = move
        player.animations.play('buzz')
        player.scale.setTo(Jsize)
        stand_counter = 5
     } else {
        player.body.velocity.x = 0 
        Woosh_counter = 0
    } 
    
    
    if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown && game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown && The_World > 250 && Jdash <= 100 && Jdash >= 0) {
        player.body.velocity.y = move * 2
        player.animations.play('dashJ')
        stand_counter = 5 
        Jdash -= 4.5
        WooshY_counter += 1
    } else if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown && The_World > 250 && Jdash <= 100 && Jdash >- 0) {
        player.body.velocity.y = -move * 2
        player.animations.play('dashJ')
        stand_counter = 5
        Jdash -= 4.5
        WooshY_counter += 1
     } else if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown && The_World > 250)  {
        player.animations.play('buzz')
        player.body.velocity.y = move 
        stand_counter = 5
    }  else if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && The_World > 250) {
        player.body.velocity.y = -move
        player.animations.play('buzz')
        stand_counter = 5
    } else {
          player.body.velocity.y = 0
          WooshY_counter = 0
    } 
    
    
    
    
    
}

const JOTARO_ATK = function(){
    if (cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y && DQatk === true && jotaro_punch > punch_cooldown && The_World > 250){
        console.log('punchDAMAGE')
        punch.play()
        ora.play()
        player.animations.play('punch') 
        dio_hp -= 1
        dio.x += knockback
        jotaro_punch = 0
        stand_counter = -5 
    }
    else if (DQatk === true && jotaro_punch > punch_cooldown && The_World > 250){
        console.log('punch')
        ora.play()
        player.animations.play('punch')
        jotaro_punch = 0
        stand_counter = -5
    }  
    if (cur_kick_X <= max_kick_X && cur_kick_Y <= max_kick_Y && DEatk === true && jotaro_kick > kick_cooldown && The_World > 250){
        console.log('kickDAMAGE')
        punch.play()
        ora.play()
        player.animations.play('kick') 
        dio_hp -= 5
        dio.x += knockback * 1.5
        jotaro_kick = 0
        stand_counter = -5 
    }
    else if (DEatk === true && jotaro_kick > kick_cooldown && The_World > 250){
        console.log('kick')
        ora.play()
        player.animations.play('kick')
        jotaro_kick = 0
        stand_counter = -5
    } 

    if (game.input.keyboard.addKey(Phaser.Keyboard.X).isDown && StarPlatinum_cooldown > 500 && jotaro_hp > 0 && dio_hp > 0){
        StarPlatinum = 0
        StarPlatinum_cooldown = 0
        starplat.play()
        stand_counter = -10
    } 

    if (StarPlatinum < 250 && dio_hp < 0){
        dio.body.velocity.x = 0
        dio.body.velocity.y = 0
    }
    else if (StarPlatinum < 250){
       
        dio.body.velocity.x = 0
        dio.body.velocity.y = 0   
    }
    else {dio.body.immovable = false} 






if (cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y && TQatk === true && jotaro_punch > punch_cooldown && The_World > 250){
    console.log('punchDAMAGE')
    punch.play()
    ora.play()
    player.animations.play('punch') 
    tanjiro_hp -= 1
    tanjiro.x += knockbackT
    jotaro_punch = 0
    stand_counter = -5 
} else if (TQatk === true && jotaro_punch > punch_cooldown && The_World > 250){
    console.log('punch')
    ora.play()
    player.animations.play('punch')
    jotaro_punch = 0
    stand_counter = -5
}
 
if (cur_Tpunch_X <= max_Tpunch_X && cur_Tpunch_Y <= max_Tpunch_Y && TEatk === true && jotaro_kick > kick_cooldown && The_World > 250){
    console.log('kickDAMAGE')
    punch.play()
    ora.play()
    player.animations.play('kick') 
    tanjiro_hp -= 5
    tanjiro.x += knockbackT * 1.5
    jotaro_kick = 0
    stand_counter = -5 
} else if (TEatk === true && jotaro_kick > kick_cooldown && The_World > 250){
    console.log('kick')
    ora.play()
    player.animations.play('kick')
    jotaro_kick = 0
    stand_counter = -5
} 


if (game.input.keyboard.addKey(Phaser.Keyboard.X).isDown && StarPlatinum_cooldown > 500 && jotaro_hp > 0 && dio_hp > 0){
    StarPlatinum = 0
    StarPlatinum_cooldown = 0
    starplat.play()
    stand_counter = -10
} 
}

const FIZIKI_JOTARO = function(){
player.body.collideWorldBounds = true


}

const OST = function(){
    diotheme = game.add.audio('dio theme')
    jotarotheme = game.add.audio('jotaro theme')
    warudo = game.add.audio('the world')
    starplat = game.add.audio('Star_Plat1')
    roundabout = game.add.audio('round') 
    punch = game.add.audio('punch')
    zero = game.add.audio('zero')
    ora = game.add.audio('ora')
    muda = game.add.audio('muda')
    Woosh = game.add.audio('Woosh')
    WooshY = game.add.audio('Woosh')
    time_end = game.add.audio('TE')
    kaktheme = game.add.audio('Kakost')
    tanslashaudio1 = game.add.audio('tanslashaudio1')
    tanslashaudio2 = game.add.audio('tanslashaudio2')
    tanslashaudio3 = game.add.audio('tanslashaudio3')

    witcher_ost = game.add.audio('witcher_ost1')
    ibuki = game.add.audio('ibuki1')
    yousayrun = game.add.audio('yousayrun1')

    warudo.volume = 0.1
    ora.volume = 0.2
    muda.volume = 0.3
    punch.volume = 0.5
    roundabout.volume = 0.1
    zero.volume = 0.5
    starplat.volume = 0.2
    kaktheme.volume = 0
    tanslashaudio1.volume = 0.2
    tanslashaudio2.volume = 0.2
    tanslashaudio3.volume = 0.2
    ibuki.play()
    ibuki.loopFull()
    yousayrun.play()
    yousayrun.loopFull()
    witcher_ost.play()
    witcher_ost.loopFull()
    //kaktheme.play()
    //kaktheme.loopFull()
}
const OST_IF = function(){
if((player.x >= 0 && player.x <= 3200 && player.y >= 0 && player.y <= 1600) === false){
ibuki.volume = 0

}
else ibuki.volume = 0.2

if(player.x >= 128 && player.x <= 928 && player.y >= 2080 && player.y <= 2656){
    yousayrun.volume = 0.2

} else yousayrun.volume = 0
if(player.x >= 2240 && player.x <= 3136 && player.y >= 2080 && player.y <= 2656){
    witcher_ost.volume = 0.2

} else witcher_ost.volume = 0
}
const CONTACTRIGHT = function(){
    
    cur_punch_X = dio.x - player.x
    cur_punch_Y = player.y - dio.y

    if (cur_punch_X < 0) cur_punch_X *= -1
    if (cur_punch_Y < 0) cur_punch_Y *= -1


    cur_kick_X = dio.x - player.x
    cur_kick_Y = player.y - dio.y

    if (cur_kick_X < 0) cur_kick_X *= -1
    if (cur_kick_Y < 0) cur_kick_Y *= -1

    cur_Tpunch_X = tanjiro.x - player.x
    cur_Tpunch_Y = player.y - tanjiro.y

    if (cur_Tpunch_X < 0) cur_Tpunch_X *= -1
    if (cur_Tpunch_Y < 0) cur_Tpunch_Y *= -1
      
    
} 

//const STOPTIME = function(){
    //if (StarPlatinum < 250 && dio_hp <= 0){
        //bg.frame = 3
    //}
    //else if (The_World < 250 && jotaro_hp <= 0){
        //bg.frame = 2
    //}
    //else if (StarPlatinum < 250 && dio_hp > 0){
        //bg.frame = 0
    //}
    //else if (The_World < 250 && jotaro_hp > 0){
        //bg.frame = 0

    //}else bg.frame = 1
//}

//const HEALTHBARDIO = function(){
   // hp1 = game.add.sprite(0, 0, 'health')
    //hp1.animations.add('gae', [0, 1, 2, 3, 4, 5, 6, 7], 60, false)
    //hp1.scale.setTo(0.4)
//}
//const DMGDIO = function() {
    //if (dio_hp === 100) {hp1.frame = 0}
    //else if (dio_hp <100 && dio_hp >= 83) {hp1.frame = 1}
    //else if (dio_hp <= 83 && dio_hp > 66) {hp1.frame = 2}
    //else if (dio_hp <= 66 && dio_hp > 50) {hp1.frame = 3}
    //else if (dio_hp <= 50 && dio_hp > 33) {hp1.frame = 4}
   // else if (dio_hp <= 33 && dio_hp > 17) {hp1.frame = 5}
   // else if (dio_hp <= 17 && dio_hp >= 1) {hp1.frame = 6}
   // else if (dio_hp < 1) {hp1.frame = 7}
    
//}

const HEALTHBARJOTARO = function(){
    hp2 = game.add.sprite(game.width / 2, game.height / 2, 'health')
    hp2.animations.add('gae', [0, 1, 2, 3, 4, 5, 6, 7], 60, false)
    hp2.scale.setTo(-0.1, 0.1)
    hp2.anchor.setTo(0.5)
}

const DMGJOTARO = function() {
    if (jotaro_hp === 100) {hp2.frame = 0}
    else if (jotaro_hp <= 83 && jotaro_hp > 66) {hp2.frame = 2}
    else if (jotaro_hp <= 66 && jotaro_hp > 50) {hp2.frame = 3}
    else if (jotaro_hp <= 50 && jotaro_hp > 33) {hp2.frame = 4}
    else if (jotaro_hp <= 33 && jotaro_hp > 17) {hp2.frame = 5}
    else if (jotaro_hp <= 17 && jotaro_hp >= 1) {hp2.frame = 6}
    else if (jotaro_hp < 1) {hp2.frame = 7}

}

const DEATH = function() {
    if (jotaro_hp <= 0 && jotaro_hp >= -5){
        player.animations.play('death')
        stand_counter = -1000000
        The_World = -100000
        bruh = false
        jotaro_hp = - 6
        zero.play()
        roundabout.play()
        //kaktheme.stop()
       ibuki.stop()
       witcher_ost.stop()
       yousayrun.stop()
    } 
    if (tanjiro_hp <= 0 && tanjiro_hp >= -4){
        tanjiro.animations.play('T_dead')
        tanjiro_hp = - 5
        bruh = false
        tan_idle = -1000000
        //roundabout.play()
        //kaktheme.stop()
    } else {
        bruh = true
    }
     if (dio_hp <= 0 && dio_hp >= -4){
        dio.animations.play('deathDio')
        pose_counter = -1000000
        StarPlatinum = -100000
        bruh = false
        dio_hp = - 5
        roundabout.play()
        //kaktheme.stop()
        ibuki.stop()
        witcher_ost.stop()
        yousayrun.stop()
    } else {
        bruh = true 
    } 
} 


