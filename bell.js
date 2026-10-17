// 数字を打つ欄。放送された13話の数字は、分かっていることを出す。
// それ以外は、その数字の名前のページがあれば開き、なければ「現在使われておりません」と出す。
(function () {
  var EP = {
    '0840': ['第1話', 'おはよう', 'ミオが丘の電話ボックスでベルをひろう。'],
    '4649': ['第2話', 'よろしく', '転校して1か月。まだ言えていない、あいさつ。'],
    '724106': ['第3話', 'なにしてる', '入院している同級生から、クラスへ。'],
    '889': ['第4話', 'はやく', '運動会。カケルと兄。'],
    '0906': ['第5話', 'おくれる', '最終バスの運転手。ボックスをふく、おばあさん。'],
    '500731': ['第6話', 'ごめんなさい', 'ミオと父のけんか。'],
    '3341': ['第7話', 'さみしい', '店を閉める文房具屋。'],
    '39': ['第8話', 'サンキュー', '担任の先生と、その先生。'],
    '0833': ['第9話', 'おやすみ', 'ゼロのすがたが、はじめてガラスにうつる。'],
    '49': ['第10話', 'しきゅう', 'カケルにひみつを知られる。'],
    '106': ['第11話', 'テル（電話して）', '受話器から、はじめてゼロの声がする。'],
    '8181': ['第12話', 'バイバイ', '丘の電話ボックスが、なくなると決まる。'],
    '3470': ['第13話', 'さよなら', 'ゼロからの、さいごの数字。鳴らないはずの電話が鳴る。つづく。']
  };
  var lcd = document.getElementById('lcd'), ans = document.getElementById('answer'), keys = document.getElementById('keys');
  var cur = '';
  function show() { lcd.textContent = cur || ' '; }
  function say(html) { ans.innerHTML = html; }
  function send() {
    if (!cur) return;
    var code = cur;
    if (EP[code]) {
      say('<strong>' + code + '</strong>　' + EP[code][0] + '「' + EP[code][1] + '」<br>' + EP[code][2]);
    } else {
      // その数字のページがあるかを確かめる
      fetch(code + '.html', {method: 'HEAD'}).then(function (r) {
        if (r.ok) { location.href = code + '.html'; }
        else { notInUse(); }
      }).catch(function () { notInUse(); });
    }
    cur = ''; show();
  }
  function notInUse() {
    say('おかけになった番号は、現在使われておりません。<br><span class="small">まだ誰にも届いていない番号が、ひとつあります。</span>');
  }
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'けす', '0', 'おくる'].forEach(function (k) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = k;
    if (k === 'おくる') b.className = 'send';
    b.addEventListener('click', function () {
      if (k === 'けす') cur = cur.slice(0, -1);
      else if (k === 'おくる') return send();
      else if (cur.length < 7) cur += k;
      show();
    });
    keys.appendChild(b);
  });
  document.addEventListener('keydown', function (e) {
    if (/^[0-9]$/.test(e.key) && cur.length < 7) { cur += e.key; show(); }
    else if (e.key === 'Backspace') { cur = cur.slice(0, -1); show(); }
    else if (e.key === 'Enter') send();
  });
  show();
})();

// 動画の右クリック（「名前を付けて動画を保存」）を出さない
document.querySelectorAll('video').forEach(function (v) {
  v.addEventListener('contextmenu', function (e) { e.preventDefault(); });
});
