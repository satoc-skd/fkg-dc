$(function(){
    //内容要素はJSONオブジェクトである、サーバ側加工しフロントに渡すもの
    // var elements = {
    //     nodes:[
    //         //グラフの点、ノードのidが必須で、他の属性は機能によって調整するばよい
    //     ],
    //     edges:[
    //         //グラフの線、エッジはsource(開始点id)とtarget(終了点id)は必須で、他の属性も追加可能
    //     ],
    // }

    // jsonから花騎士のデータを読み込む
    var toJson = function(obj){ return obj.json(); };
    var toText = function(obj){ return obj.text(); };

    var graphP = fetch('fkgCharacters.json')
      .then(toJson)
      .catch((e) => {
        console.log(e);
      });

    //内容要素を表現するCSS
    var style = [
        //セレクターで拾いた内容要素が 指定したCSSを適用する
        //ノードの中で、label属性は「Peson」のノードが青色で表示し、文字はname属性を表示する
        { selector: 'node[label = "Person"]', 
          css: {'background-color': '#6FB1FC', 'content': 'data(name)'}
        },
        //ノードの中で、label属性は「Movie」のノードがオレンジ色で表示し、文字はtitle属性を表示する
        { selector: 'node[label = "Movie"]', 
          css: {'background-color': '#F5A45D', 'content': 'data(title)'}
        },
        //ノードの中で、label属性は「Movie」のノードがオレンジ色で表示し、文字はtitle属性を表示する
        { selector: 'node[label = "Group"]', 
          css: {'background-color': '#7F7F7F', 'content': 'data(name)'}
        },
        //エッジ全体で、文字はrelationship属性を表示する、終了点での矢印は三角形にする
        { selector: 'edge', 
          css: {'content': 'data(relationship)', 'target-arrow-shape': 'triangle',
                 'line-color': 'gray', 'target-arrow-color': 'gray',
                 'control-point-step-size': '200',
                }
        },
        { selector: 'edge[isbooth = "true"]',
          css: {'source-arrow-color': 'gray', 'source-arrow-shape': 'triangle'}
        },
        { selector: 'node[id = "60003"]',
          css: {'background-image': './img/60003.jpg' }
        },
        { selector: 'node[id = "50001"]',
          css: {'background-image': './img/50001.jpg' }
        },
        { selector: 'node[id = "20001"]',
          css: {'background-image': './img/20001.png' }
        },
        { selector: 'node[id = "40001"]',
          css: {'background-image': './img/40001.jpg' }
        },
        { selector: 'node[id = "60001"]',
          css: {'background-image': './img/60001.jpg' }
        },
        { selector: 'node[id = "60002"]',
          css: {'background-image': './img/60002.png' }
        },
        { selector: 'node[id = "50002"]',
          css: {'background-image': './img/50002.jpg' }
        },
        { selector: 'node[id = "50003"]',
          css: {'background-image': './img/50003.png' }
        },
        { selector: 'node[id = "50004"]',
          css: {'background-image': './img/50004.png' }
        },
        { selector: 'node[id = "50005"]',
          css: {'background-image': './img/50005.JPG' }
        },
        { selector: 'node[id = "40002"]',
          css: {'background-image': './img/40002.jpg' }
        },
        { selector: 'node[id = "40003"]',
          css: {'background-image': './img/40003.jpg' }
        },
        { selector: 'node[id = "20002"]',
          css: {'background-image': './img/20002.png' }
        },
        { selector: 'node[id = "20003"]',
          css: {'background-image': './img/20003.png' }
        },
        { selector: 'node[id = "30001"]',
          css: {'background-image': './img/30001.jpg' }
        },
        { selector: 'node[label !="Group"]', 
          css: {
            'height': '110px',
            'width': '110px',
            'shape': 'rectangle'
          }
        },
    ]
  

    Promise.all([ graphP ]).then(initCy);

    // 初期処理
    function initCy( then ){
      //レイアウト設定
      var layout2 = {
          //グリッドレイアウトを適用する
          name : 'preset',

          fit: 'true,'
      }

      var expJson = then[0];

      // Cytoscapeオブジェクト初期化。
      window.cy = cytoscape({ 
        // containerがHTML内の「cy」DOM要素に指定
        container: document.getElementById('cy'),
        elements: expJson.elements,
        style: style,
        layout: layout2,
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
  });

  