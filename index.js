`use strict`;

const input = process.argv.slice(2);
const skill = input[0];

function clearScreen() {
  console.clear();
}

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e8; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function findEnemy() {
  let enemy = [{
    m: 7
  }, {
    m: 7
  }, {
    m: 7
  }, {
    m: 7
  }, {
    m: 7
  }, {
    m: 7
  }, {
    m: 7
  }, {
    m: 7
  }, {
    M: 14
  }, {
    M: 14
  }, {
    M: 14
  }]
  let index = Math.floor(Math.random() * enemy.length);
  return enemy[index];
}

function pickSkill() {
  let pick = ["s", "n", "n", "n", "n", "n", "n", "n", "n", "n"]
  let index = Math.floor(Math.random() * pick.length);
  return pick[index];
}

function useSkill(skill, enemy, hero) {
  if (skill == "regen") {
    hero += 10
    if (hero > 100) {
      hero = 100
    }
    hero -= 7
    enemy -= 7
    return enemy, hero
  }
  enemy = 0
  return enemy, hero
}

function fighting(enemy, hero, skill) {
  enemyHealt = enemy.M | enemy.m
  heroHealt = hero
  console.log("awal healt",heroHealt," musuh ",Object.keys(enemy));
  while (enemyHealt > 0) {
    skillChoise = pickSkill()
    console.log("skil or no ",skillChoise);
    if (skillChoise != "s") {
      enemyHealt -= 7
      heroHealt -= 7
      console.log("akhir healt",heroHealt);
      return heroHealt
    }
    console.log("akhir healt",heroHealt);
    enemyHealt, heroHealt = useSkill(skill, enemyHealt, heroHealt)
  }
  console.log("final healt",heroHealt);
  return heroHealt
}
function logArena(lm,moster,stage,hp) {
  lastmatching=Array.from(lm)
  if (lastmatching.length-1<9) {
    lastmatching[lastmatching.length-1]=`H vs ${moster}`
  }
  logmatch=`|${lastmatching[0]}|${lastmatching[1]?lastmatching[1]:" "}|${lastmatching[2]?lastmatching[2]:" "}|${lastmatching[3]?lastmatching[3]:" "}|${lastmatching[4]?lastmatching[4]:" "}|${lastmatching[5]?lastmatching[5]:" "}|${lastmatching[6]?lastmatching[6]:" "}|${lastmatching[7]?lastmatching[7]:" "}|${lastmatching[8]?lastmatching[8]:" "}|${lastmatching[9]?lastmatching[9]:" "}|`
  stament=
    `
    Stage ${stage}
    HP : ${hp}
    Skill: ${skill}
    ${logmatch}
    `;
    console.log(stament)
}
function startGame(skill) {
  const skills = ["regen", "ulti"]
  if (!skills.includes(skill)) {
    return console.log("invalid skill");
  }
  let lastmatch=[]
  var healt = 100
  for (let index = 1; index < 11; index++) {
    let enemy=findEnemy()
    healt = fighting(enemy, healt, skill)
    lastmatch.push(Object.keys(enemy))
    logArena(lastmatch,Object.keys(enemy),index-1,healt)
    sleep(1000)
    clearScreen()
  }
  logArena(lastmatch,lastmatch[lastmatch.length-1],10,healt)
}
startGame(skill);