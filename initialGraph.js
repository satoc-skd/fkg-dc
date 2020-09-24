$(function(){
    // JSON読み込みを行うファンクション
    var toJson = function(obj){ return obj.json(); };

    // 文字列読み込みを行うファンクション
    var toText = function(obj){ return obj.text(); };

    // jsonから花騎士のデータを読み込む
    var graphP = fetch('fkgCharacters.json')
      .then(toJson)
      .catch((e) => {
        console.log(e);
      });

    //内容要素を表現するCSSは外部ファイルで取得する
    var styleP = fetch('fkgCharacters.cycss')
      .then(toText)
      .catch((e) => {
        console.log(e);
      });


    Promise.all([ graphP, styleP ]).then(initCy);

    // 初期処理
    function initCy( then ){
      //レイアウト設定
      var layout2 = {
          //グリッドレイアウトを適用する
          name : 'preset',

          fit: 'true,'
      }

      var expJson = then[0];
      var expStyle = then[1];

      // Cytoscapeオブジェクト初期化。
      window.cy = cytoscape({ 
        // containerがHTML内の「cy」DOM要素に指定
        container: document.getElementById('cy'),
        elements: expJson.elements,
        style: expStyle,
        layout: layout2,
      });


      // タップしたら、コンソールに名前と座標を出力する
      cy.on('tap', 'node', function(evt){
        console.log('Click name is ' + evt.cyTarget.data().name + '->' + JSON.stringify(evt.cyTarget.position()));
      });



  }


    $("#IdBtnSave").click(function () {
      var s = "";
      var nodes = window.cy.nodes();
      nodes.forEach(function (node) {
        s += JSON.stringify(node.json());
        s += "\n";
      });
      // $("#IdElementsPosition").val(s);
      console.log(s);
    });

    // モーダルウィンドウが開くときの処理    
    $(".modalOpen").click(function(){
            
      var navClass = $(this).attr("class"),
          href = $(this).attr("href");
              
          $(href).fadeIn();
      $(this).addClass("open");
      return false;
    });

    // モーダルウィンドウが閉じるときの処理    
    $(".modalClose").click(function(){
      $(this).parents(".modal").fadeOut();
      $(".modalOpen").removeClass("open");
      return false;
    });  

  });

  