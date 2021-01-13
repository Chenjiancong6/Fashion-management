<template>
  <div class="home">
    <h1>数据可视化-潮流街APP</h1>
    <div id="showtime">当前时间</div>
       <section>
        <div class="main">
            <div class="column">
                <div class="panel">
                    <div class="panel-footer">
                    </div>
                    <div class="bar">
                        <h2>柱形图-就业行业</h2>
                        <div class="chart" id="a">
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-footer">
                    </div>

                    <div class="line">
                        <h2>折线图-人员变化
                            <a href="javascript:;">2020</a>
                            <a href="javascript:;">2021</a>
                        </h2>
                        <div class="chart">
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-footer">
                    </div>
                    <div class="pie">
                        <h2>柱形图-就业行业</h2>
                        <div class="chart">
                        </div>
                    </div>
              </div>
            </div>


            <div class="column">
                <div class="num">
                    <div class="num-hd">
                        <ul>
                            <li>154555</li>
                            <li>25443</li>
                        </ul>
                    </div>
                    <div class="num-bd">
                        <ul>
                            <li>前端</li>
                            <li>市场</li>
                        </ul>
                    </div>
                </div>
                <div class="map">
                    <div class="map1"></div>
                    <div class="map2"></div>
                    <div class="map3"></div>
                    <div class="chart"></div>
                </div>
            </div>
            <div class="column">
                <div class="panel">
                    <div class="panel-footer">
                    </div>

                    <div class="bar2">
                        <h2>柱形图-就业行业</h2>
                        <div class="chart">
                        </div>
                    </div>

                </div>
                <div class="panel">
                    <div class="panel-footer">
                    </div>
                    <div class="line2">
                        <h2>柱形图-就业行业</h2>
                        <div class="chart">
                        </div>
                    </div>

                </div>

                <div class="panel">
                    <div class="panel-footer">
                    </div>

                    <div class="pie2">
                        <h2>柱形图-就业行业</h2>
                        <div class="chart">
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </section>
  </div>
</template>

<script>
export default {
   name:"Home",
   data() {
      return { clock:null};
    },
    methods: {      
       nowTime() {     
          this.clock = setTimeout(nowTime, 1000);    
                clearTimeout(clock);
                var t = new Date();
                var time = t.getFullYear() + "年" + t.getMonth() +
                    "月" + t.getDate() + "日" + t.getHours() + "时" + t.getMinutes() +
                    "分" + t.getSeconds() + "秒";
                document.getElementById('showtime').innerHTML = time;
                clock = setTimeout(nowTime, 1000);
            }
    },
    created(){
    
    },
   mounted() {
  const a = document.createElement('script');
  a.type = 'javascript';
  a.src = 'https://www.jq22.com/jquery/echarts-4.2.1.min.js';
  document.body.appendChild(a);
  //
   const b = document.createElement('script');
  b.type = 'javascript';
  b.src = 'https://www.jq22.com/jquery/jquery-1.10.2.js';
  document.body.appendChild(b);
  //
    const c = document.createElement('script');
  c.type = 'javascript';
  c.src = '/src/assets/echarts/js/flexible.js';
  document.body.appendChild(c);
   //
    const d = document.createElement('script');
  d.type = 'javascript';
  d.src = '/src/assets/echarts/js/china.js';
  document.body.appendChild(d);
    //
    const e = document.createElement('script');
  e.type = 'javascript';
  e.src = '/src/assets/echarts/js/myMap.js';
  document.body.appendChild(e);
  //
    const f = document.createElement('script');
  f.type = 'javascript';
  f.src = '/src/assets/echarts/js/index.js';
  document.body.appendChild(f);
 },


}
</script>


<style>
@import "../../assets/echarts/css/normalize.css";
@import "../../assets/echarts/css/index.css";
/* .home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
</style>