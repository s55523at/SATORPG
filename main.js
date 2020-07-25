let plyName = prompt("名前を入力してください");
let m = 0;
let flag = true;
plySt0.textContent = plyName;
//プレイヤーデータforで回して配列
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 50];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(6);
for (i = 0; i > 6; i++) {
  plySt[i] = document.getElementById("plySt" + i);
}
//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP:" + plyHp;
  }
});
//敵データ ene0を配列にする
let eneHpMax = [10, 15, 20];
let eneAtt = [2, 4, 5];
let eneKill = [0, 0, 0];
let eneExp = [1, 3, 5];
let eneCntMax = [5, 4, 3];
let eneName = ["自由研究の失敗作", "あほづらたろう", "近所の佐藤さん"];
let eneLv = 1;
let eneHp = 10;
let eneCnt;
let nokori = 10 - eneKill[2];
eneSt0.textContent = eneName[m];

let eneImg = document.getElementById("eneImg");
let eneSt = new Array(4);
for (i = 0; i > 4; i++) {
  eneSt[i] = document.getElementById("eneSt" + i);
}
//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + (eneLv - 1) + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + (eneLv - 1) + ".png";
    if (eneHp >= 0) {
      eneHp -= plyAtt;
      nokori = 10 - eneKill[2];
      plySt7.textContent = "全国の佐藤さん残り " + nokori + " 人";
    } else {
      eneHp = eneHpMax[m];
      eneKill[m]++;
      eneSt4.textContent = "倒した回数:" + eneKill[m];
      plySt7.textContent = "全国の佐藤さん残り " + nokori + " 人";
      //ゲームクリア
      if (eneKill[2] == 10) {
        plySt7.textContent = "全国の佐藤さん残り 0 人";
        clearInterval(loop);
        flag = false;
        eneSec.textContent = "ゲームクリア!!";
        eneImg.src = "img/gameclear.png";
      }
      //経験値の処理
      plyExp += eneExp[m];
      plySt5.textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp[m];
      //レベルアップの処理
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySt1.textContent = "レベル:" + plyLv;
        plyHpMax = plyLv * 2 + 6;
        plyHp = plyHpMax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt++;
        plySt3.textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法:" + plyHeal;
      }
      plySt6.textContent = "次のレベルまでの経験値 " + plyExpNext + " ポイント";
    }
    eneSt2.textContent = "HP:" + eneHp;
  }
});
//敵が時間ごとに攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (eneCnt > 0) {
    eneCnt--;
    eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp -= eneAtt[m];
    if (plyHp >= 0) {
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt = eneCntMax[m];
        plyImg.src = "img/playerA.png";
        eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
      }
    }, 500);
  }
}, 1000);

//敵変更
let right = document.getElementById("right");
let left = document.getElementById("left");
if (flag) {
  right.addEventListener("mousedown", () => {
    if (m < 2) {
      m++;
      eneLv++;
      eneImg.src = "img/enemyA" + (eneLv - 1) + ".png";
      eneSt0.textContent = "モンスター" + m;
      eneSt1.textContent = "レベル:" + eneLv;
      eneSt2.textContent = "HP:" + eneHpMax[m];
      eneSt3.textContent = "攻撃力:" + eneAtt[m];
      eneSt4.textContent = "倒した回数:" + eneKill[m];
      eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
      eneSt0.textContent = eneName[m];
    }
  });
  left.addEventListener("mousedown", () => {
    if (m > 0) {
      m--;
      eneLv--;
      eneImg.src = "img/enemyA" + (eneLv - 1) + ".png";
      eneSt0.textContent = "モンスター" + m;
      eneSt1.textContent = "レベル:" + eneLv;
      eneSt2.textContent = "HP:" + eneHpMax[m];
      eneSt3.textContent = "攻撃力:" + eneAtt[m];
      eneSt4.textContent = "倒した回数:" + eneKill[m];
      eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
      eneSt0.textContent = eneName[m];
    }
  });
}
