<template>
  <div id="report" style="position: relative;">
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <div
          style="background-color: #1e9fff;padding:20px 0 0 20px;color: #fff;font-size:24px;font-weight:600"
        >防护网站：{{params.domain}}</div>
        <div class="layout-nav">
          <ul>
            <li>
              <router-link tag="span" :to="'/report/'+ params.domain + '/' + params.date">防护报表</router-link>
            </li>
            <li>
              <router-link
                tag="span"
                :to="'/report1/'+ params.domain + '/' + params.date"
                style="color:#34EDED;border-bottom: 2px solid #fff;padding: 10px 0px;"
              >访问报表</router-link>
            </li>
          </ul>
          <ul>
            <li>
              <DatePicker
                class="color"
                :type="dateType"
                :value="params.date || new Date()"
                :options="options"
                :editable="editable"
                style="width: 200px"
                @on-change="handleChange"
              ></DatePicker>
              <Button type="default" @click="subDate">提交</Button>
            </li>
            <li>
              <Button type="primary" @click="getPdf1">报表</Button>
            </li>
          </ul>
        </div>
      </Col>
      <Col span="24">
        <div class="bgCard clear">
          <h2 style="margin-bottom:20px">综合评级</h2>
          <!-- <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">网站访问次数</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="logo-rss" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px">
                    <p>
                      <span class="font">868</span>
                      <span>次</span>
                    </p>
                    <p>
                      访问IP数：
                      <span class="font1">8</span>
                      <span>个</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">拦截攻击次数</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="ios-albums-outline" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px">
                    <p>
                      <span class="font">422</span>
                      <span>次</span>
                    </p>
                    <p>
                      攻击源区域：
                      <span class="font1">4</span>
                      <span>个</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">网站总流量</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="ios-ribbon-outline" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px;line-height:81px">
                    <p>
                      <span class="font">1234</span>
                      <span>M</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">疑似攻击源</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="md-wifi" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px;line-height:81px">
                    <p>
                      <span class="font">4</span>
                      <span>个</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>-->
          <Row style="padding:10px" :gutter="16">
            <Col span="12">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">网站访问次数</p>
                <div style="display:flex;">
                  <Icon type="logo-rss" size="56" style="margin:auto 30px;" />
                  <div style="height:81px;min-width:140px">
                    <p>
                      <span class="font">{{head_data.access_count}}</span>
                      <span>次</span>
                    </p>
                    <p>
                      访问IP数：
                      <span class="font1">{{head_data.access_ip_count}}</span>
                      <span>个</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span="12">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">网站总流量</p>
                <div style="display:flex;">
                  <Icon type="ios-ribbon-outline" size="56" style="margin:auto 30px;" />
                  <div style="height:81px;min-width:140px;line-height:81px">
                    <p>
                      <span class="font">{{head_data.all_flow_size}}</span>
                      <span>M</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">关键指标</p>
          <div style="height:300px;display:flex;justify-content:space-around;align-items: center;">
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#F0412E"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#F0412E;margin-bottom:10px;">{{indicators.exception_total_time}} S</h1>
                <p>异常时长</p>
              </div>
            </i-circle>
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#F0412E"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#F0412E;margin-bottom:10px;">{{indicators.exception_total_count}} 次</h1>
                <p>异常次数</p>
              </div>
            </i-circle>
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#0283E1"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#0283E1;margin-bottom:10px;">{{indicators.normal_average_delay}} S</h1>
                <p>平均延时</p>
              </div>
            </i-circle>
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#0283E1"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#0283E1;margin-bottom:10px;">{{indicators.normal_delay_count}} 次</h1>
                <p>延时5S以上</p>
              </div>
            </i-circle>
          </div>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">异常响应分析</p>
          <Row :gutter="16">
            <Col span="12">
              <div id="pie1" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <Table border stripe :columns="columns1" :data="data1"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问源区域分布</p>
          <Row :gutter="16">
            <Col span="12">
              <div>展现当天网络访问源的境内分布，了解境内访问源区域，为下一步安全保障提供数据支撑</div>
              <div id="map1" style="height:450px"></div>
            </Col>
            <Col span="12">
              <div>访问源区域分布 top10</div>
              <br />
              <Table border stripe :columns="columns2" :data="data2"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问源 IP TOP10</p>
          <Row :gutter="16">
            <Col span="12">
              <div id="bar1" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <Table border stripe :columns="columns4" :data="data4"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问页面排行</p>
          <Row :gutter="16">
            <Col span="24">
              <div>展现访客对站点各页面的访问情况，重点从浏览量、独立访客、访问独立IP数等维度进行分析，发现最受欢迎的页面</div>
              <br />
              <Table border stripe :columns="columns5" :data="data5"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问来源分析</p>
          <Row :gutter="16">
            <Col span="12">
              <div>展现站点流量的来源方式及占比，帮助站点有效运营和制作最佳推广方案</div>
              <div id="pie2" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <Table border stripe :columns="columns6" :data="data6"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问终端分析</p>
          <Row :gutter="16">
            <Col span="12">
              <div>展现站点流量的来源方式及占比，帮助站点有效运营和制作最佳推广方案</div>
              <div id="pie3" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <div id="pie4" style="height:450px"></div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">响应码分布</p>
          <Row :gutter="16">
            <Col span="12">
              <div>通过发现异常的响应码分布和发现有问题的页面，有针对性的整改，有效提高用户体验</div>
              <div id="pie5" style="height:450px"></div>
            </Col>
            <Col span="12">
              <div>状态码分布</div>
              <br />
              <Table border stripe :columns="columns7" :data="data7"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
  </div>
</template>
<script>
import html2Canvas from 'html2canvas'
import canvg from 'canvg'
import JsPDF from 'jspdf'
import $ from 'jquery'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  inject: ['reload'],
  data() {
    return {
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      title: '报表',
      editable: false, //日期禁止输入
      theme1: 'light',
      spinShow: true,
      head_data: {},
      columns1: [
        {
          title: '异常响应',
          key: 'response_status_type'
        },
        // {
        //   title: '开始时间',
        //   key: 'startTime'
        // },
        // {
        //   title: '结束时间',
        //   key: 'overTime'
        // },
        {
          title: '持续时长',
          key: 'response_status_time'
        }
      ],
      data1: [],
      columns2: [
        {
          title: '区域',
          key: 'access_ip_loc'
        },
        {
          title: '访问量',
          key: 'access_ip_num'
        },
        {
          title: '访问量占比',
          key: 'access_percentage'
        }
      ],
      data2: [
        {
          access_ip_loc: '北京',
          access_percentage: '81.25%',
          access_ip_num: 13
        }
      ],
      columns4: [
        {
          title: 'IP',
          key: 'access_ip'
        },
        {
          title: '区域',
          key: 'access_ip_loc'
        },
        {
          title: '访问量',
          key: 'access_ip_num'
        },
        {
          title: '访问量占比',
          key: 'access_percentage'
        }
      ],
      data4: [
        {
          access_ip_loc: '北京',
          access_ip: '221.130.253.135',
          access_percentage: '81.25%',
          access_ip_num: 13
        },
        {
          access_ip_loc: '北京',
          access_ip: '106.13.41.121',
          access_percentage: '18.75%',
          access_ip_num: 3
        }
      ],
      columns5: [
        {
          title: '栏目/URL',
          align: 'center',
          key: 'access_url_path'
        },
        {
          title: '浏览数',
          align: 'center',
          key: 'access_url_num'
        }
      ],
      data5: [
        {
          access_url_path: '/index.php',
          access_url_num: 16
        }
      ],
      columns6: [
        {
          title: '类型',
          key: 'access_source_type'
        },
        {
          title: '访问次数',
          key: 'access_source_num'
        },
        {
          title: '访问占比',
          key: 'access_source_per'
        }
      ],
      data6: [
        {
          access_source_per: '75.0%',
          access_source_num: 12,
          access_source_type: '爬虫'
        },
        {
          access_source_per: '25.0%',
          access_source_num: 4,
          access_source_type: '客户端工具\t'
        }
      ],
      columns7: [
        {
          title: '响应码',
          key: 'response_code_type'
        },
        {
          title: '次数',
          key: 'response_code_num'
        },
        {
          title: '占比',
          key: 'response_code_per'
        }
      ],
      data7: [
        {
          response_code_type: 500,
          response_code_num: 5,
          response_code_per: '31.25%'
        },
        {
          response_code_type: 200,
          response_code_num: 4,
          response_code_per: '25.0%'
        },
        {
          response_code_type: 400,
          response_code_num: 4,
          response_code_per: '25.0%'
        },
        {
          response_code_type: 502,
          response_code_num: 3,
          response_code_per: '18.75%'
        }
      ],
      indicators: {},
      pie1_data: [],
      pie2_data: [],
      pie3_data: [],
      pie4_data: [],
      pie5_data: [],
      map_data: [],
      bar_datax: [],
      bar_datay: [],
      map_num: 0,
      params: {},
      dateType: 'date',
      date: ''
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    handleChange(date) {
      this.date = date
    },
    getPdf1: function() {
      // this.showQRCode()
      scrollTo(0, 0)
      var nodesToRecover = []
      var nodesToRemove = []
      var svgElem = $('#report').find('svg') //divReport为需要截取成图片的dom的id
      svgElem.each(function(index, node) {
        var parentNode = node.parentNode
        var svg = node.outerHTML.trim()

        var canvas = document.createElement('canvas')
        canvg(canvas, svg)
        if (node.style.position) {
          canvas.style.position += node.style.position
          canvas.style.left += node.style.left
          canvas.style.top += node.style.top
        }

        nodesToRecover.push({
          parent: parentNode,
          child: node
        })
        parentNode.removeChild(node)

        nodesToRemove.push({
          parent: parentNode,
          child: canvas
        })

        parentNode.appendChild(canvas)
      })

      var title = this.title
      var dom = document.getElementById('#report')
      var c = document.createElement('canvas')
      // document.querySelector('#report').style.width = '1280px'
      c.width = document.querySelector('#report').offsetWidth * 2
      c.height = document.querySelector('#report').offsetHeight * 2
      c.getContext('2d').scale(2, 2)
      var opts = {
        scale: 2,
        canvas: c,
        allowTaint: true,
        logging: true,
        width: document.querySelector('#report').offsetWidth,
        height: document.querySelector('#report').offsetHeight
      }
      html2Canvas(document.querySelector('#report'), opts).then(function(
        canvas
      ) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = (contentWidth / 592.28) * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 575.28
        let imgHeight = (592.28 / contentWidth) * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 10, 10, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 10, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
      document.querySelector('#report').style.width = '100%'
    },
    showQRCode() {
      scrollTo(0, 0)

      if (typeof html2canvas !== 'undefined') {
        //以下是对svg的处理
        var nodesToRecover = []
        var nodesToRemove = []
        var svgElem = $('#report').find('svg') //divReport为需要截取成图片的dom的id
        console.log(svgElem)

        svgElem.each(function(index, node) {
          var parentNode = node.parentNode
          var svg = node.outerHTML.trim()

          var canvas = document.createElement('canvas')
          canvg(canvas, svg)
          if (node.style.position) {
            canvas.style.position += node.style.position
            canvas.style.left += node.style.left
            canvas.style.top += node.style.top
          }

          nodesToRecover.push({
            parent: parentNode,
            child: node
          })
          parentNode.removeChild(node)

          nodesToRemove.push({
            parent: parentNode,
            child: canvas
          })

          parentNode.appendChild(canvas)
        })
        html2canvas(document.querySelector('#divReport'), {
          onrendered: function(canvas) {
            var base64Str = canvas.toDataURL() //base64码，可以转图片

            //...
            $('<img>', { src: base64Str }).appendTo($('body')) //直接在原网页显示
          }
        })
      }
    },
    subDate() {
      let url = '/report/' + this.params.domain + '/' + this.date
      this.$router.replace({ path: url })
      this.reload()
    },
    wrapEcharts() {
      this.$nextTick(() => {
        var myChart1 = echarts.init(document.getElementById('pie1'))
        var option1 = null

        option1 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            // text: '某站点用户访问来源',
            // subtext: '纯属虚构',
            // x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     left: 'left',
          //     data: ['中国', '美国', '俄罗斯', '日本', '英国']
          // },
          series: [
            {
              name: '异常响应',
              type: 'pie',
              radius: ['30%', '61%'],
              center: ['50%', '50%'],
              data: this.pie1_data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        if (option1 && typeof option1 === 'object') {
          myChart1.setOption(option1, true)
        }
        var myChart2 = echarts.init(document.getElementById('map1'))
        var option2 = null

        option2 = {
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            show: false,
            min: 0,
            max: this.map_num,
            left: 'left',
            color: ['red', '#FF7F50', '#0096F3'],
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true
          },
          series: [
            {
              name: '访问源',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  areaColor: '#A4B1DE',
                  borderColor: '#F1F5FB',
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: '#fff464',
                  borderWidth: 0
                }
              },
              data: this.map_data
            }
          ]
        }
        if (option2 && typeof option2 === 'object') {
          myChart2.setOption(option2, true)
        }
        var myChart3 = echarts.init(document.getElementById('bar1'))
        var option3 = null
        var datay = [
          '42.236.10.125',
          '221.130.253.135',
          '117.136.0.133',
          '117136.138.9'
        ]
        var datax = [2, 3, 28, 605]
        option3 = {
          tooltip: {
            trigger: 'item'
          },
          grid: {
            left: '1.5%',
            top: 35,
            right: '8%',
            bottom: '1%',
            containLabel: true
          },
          xAxis: {
            show: true,
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: this.bar_datax.reverse(),
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000'
              }
            },
            nameTextStyle: {
              fontSize: 12
              // color:'#fff'
            }
          },
          series: [
            {
              type: 'bar',
              data: this.bar_datay.reverse(),
              barWidth: 14,
              barMinHeight: 20,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '正常'
                  }
                },
                emphasis: {
                  barBorderRadius: 7
                },
                normal: {
                  barBorderRadius: 7,
                  color: '#4C9AFB'
                }
              }
            }
          ]
        }
        if (option3 && typeof option3 === 'object') {
          myChart3.setOption(option3, true)
        }
        //echarts4
        var myChart4 = echarts.init(document.getElementById('pie2'))
        var option4 = null

        option4 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     x: 'left',
          //     data: ['SQL注入攻击', '文件限制', '漏洞防护', '协议违规', '跨站脚本攻击', 'HTTP请求出错', '文件注入攻击',
          //         '目录信息泄露', '命令注入攻击', 'HTTP方法限制'
          //     ]
          // },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['35%', '55%'],

              data: this.pie2_data
            }
          ]
        }
        if (option4 && typeof option4 === 'object') {
          myChart4.setOption(option4, true)
        }

        //echarts5
        var myChart5 = echarts.init(document.getElementById('pie3'))
        var option5 = null

        option5 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            text: '设备终端分布',
            textStyle: {
              // color: "#999"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: "vertical",
          //   x: "left",
          //   data: ["爬虫", "客户端工具"]
          // },
          series: [
            {
              name: '设备终端',
              type: 'pie',
              radius: ['35%', '55%'],

              data: this.pie3_data
            }
          ]
        }
        if (option5 && typeof option5 === 'object') {
          myChart5.setOption(option5, true)
        }
        //echarts5
        var myChart6 = echarts.init(document.getElementById('pie4'))
        var option6 = null

        option6 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            text: '设备浏览器分布',
            textStyle: {
              // color: "#999"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: "vertical",
          //   x: "left",
          //   data: ["爬虫", "客户端工具"]
          // },
          series: [
            {
              name: '设备浏览器',
              type: 'pie',
              radius: ['0%', '55%'],

              data: this.pie4_data
            }
          ]
        }
        if (option6 && typeof option6 === 'object') {
          myChart6.setOption(option6, true)
        }
        //echarts5
        var myChart7 = echarts.init(document.getElementById('pie5'))
        var option7 = null

        option7 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            // text: "设备浏览器分布",
            // textStyle: {
            // color: "#999"
            // }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: "vertical",
          //   x: "left",
          //   data: ["爬虫", "客户端工具"]
          // },
          series: [
            {
              name: '响应码',
              type: 'pie',
              radius: ['0%', '55%'],

              data: this.pie5_data
            }
          ]
        }
        if (option7 && typeof option7 === 'object') {
          myChart7.setOption(option7, true)
        }
        window.addEventListener('resize', function() {
          myChart1.resize()
          myChart2.resize()
          myChart3.resize()
          myChart4.resize()
        })
      })
    },
    getData() {
      this.params = this.$route.params
      if (this.$route.params.date.length < 8) {
        this.dateType = 'month'
      }
      var res = {
        msg: '',
        date_time: '2019-08-05',
        code: 0,
        data: {
          access_source_analysis: [
            {
              access_source_per: '75.0%',
              access_source_num: 12,
              access_source_type: '爬虫'
            },
            {
              access_source_per: '25.0%',
              access_source_num: 4,
              access_source_type: '客户端工具\t'
            }
          ],
          access_response_code_distribution: [
            {
              response_code_type: 500,
              response_code_num: 5,
              response_code_per: '31.25%'
            },
            {
              response_code_type: 200,
              response_code_num: 4,
              response_code_per: '25.0%'
            },
            {
              response_code_type: 400,
              response_code_num: 4,
              response_code_per: '25.0%'
            },
            {
              response_code_type: 502,
              response_code_num: 3,
              response_code_per: '18.75%'
            }
          ],
          access_ip_rank: [
            {
              access_ip_loc: '北京',
              access_ip: '221.130.253.135',
              access_percentage: '81.25%',
              access_ip_num: 13
            },
            {
              access_ip_loc: '北京',
              access_ip: '106.13.41.121',
              access_percentage: '18.75%',
              access_ip_num: 3
            }
          ],
          access_key_indicators: {
            normal_delay_count: 0,
            exception_total_time: 36.0,
            exception_total_count: 12,
            normal_average_delay: 3.0
          },
          access_anomaly_response_analysis: {
            response_status_type_time_list: [
              {
                response_status_type: 500,
                response_status_time: 0.07
              },
              {
                response_status_type: 400,
                response_status_time: 0.05
              },
              {
                response_status_type: 200,
                response_status_time: 0.05
              },
              {
                response_status_type: 502,
                response_status_time: 0.03
              }
            ],
            response_status_type_num_list: [
              {
                response_status_type: 400,
                response_status_num: 4,
                response_status_per: '25.0%'
              },
              {
                response_status_type: 200,
                response_status_num: 4,
                response_status_per: '25.0%'
              },
              {
                response_status_type: 500,
                response_status_num: 5,
                response_status_per: '31.25%'
              },
              {
                response_status_type: 502,
                response_status_num: 3,
                response_status_per: '18.75%'
              }
            ]
          },
          access_index_rank: [
            {
              access_url_path: '/index.php',
              access_url_num: 16
            }
          ],
          access_head_data: {
            access_ip_count: 2,
            all_flow_size: 7.31,
            access_count: 16
          },
          access_terminal_analysis: {
            access_browser_rank_list: [
              {
                ua_browser_per: '25.0%',
                ua_browser_num: 4,
                ua_browser_type: 'IE'
              },
              {
                ua_browser_per: '75.0%',
                ua_browser_num: 12,
                ua_browser_type: 'Baiduspider'
              }
            ],
            access_terminal_rank_list: [
              {
                ua_os_per: '25.0%',
                ua_os_type: 'Windows',
                ua_os_num: 4
              },
              {
                ua_os_per: '75.0%',
                ua_os_type: 'Other',
                ua_os_num: 12
              }
            ]
          },
          access_china_source_rank: [
            {
              access_ip_loc: '北京',
              access_percentage: '81.25%',
              access_ip_num: 13
            }
          ]
        }
      }
      var url =
        '/access_all_info/?access_domain=' +
        this.$route.params.domain +
        '&date_time=' +
        this.$route.params.date
      var that = this
      this.$http
        .get(url)
        .then(function(response) {
          if (response.data.code) {
            that.$Message.error({
              content: response.data.msg,
              duration: 5
            })
            return
          }
          let data = response.data.data
          that.head_data = data.access_head_data
          that.indicators = data.access_key_indicators
          that.data1 =
            data.access_anomaly_response_analysis.response_status_type_time_list
          that.data2 = data.access_china_source_rank
          that.data4 = data.access_ip_rank
          that.data5 = data.access_index_rank
          that.data6 = data.access_source_analysis
          that.data7 = data.access_response_code_distribution
          let pie1 =
            data.access_anomaly_response_analysis.response_status_type_num_list
          let pie3 = data.access_terminal_analysis.access_terminal_rank_list
          let pie4 = data.access_terminal_analysis.access_browser_rank_list
          for (let i = 0; i < pie1.length; i++) {
            that.pie1_data.push({
              name: pie1[i].response_status_type,
              value: pie1[i].response_status_num
            })
          }
          for (let i = 0; i < pie3.length; i++) {
            that.pie3_data.push({
              name: pie3[i].ua_os_type,
              value: pie3[i].ua_os_num
            })
          }
          for (let i = 0; i < pie4.length; i++) {
            that.pie4_data.push({
              name: pie4[i].ua_browser_type,
              value: pie4[i].ua_browser_num
            })
          }
          for (let i = 0; i < that.data2.length; i++) {
            if (that.data2[i].access_ip_num > that.map_num) {
              that.map_num = that.data2[i].access_ip_num
            }
            that.map_data.push({
              name: that.data2[i].access_ip_loc,
              value: that.data2[i].access_ip_num
            })
          }
          for (let i = 0; i < that.data4.length; i++) {
            that.bar_datax.push(that.data4[i].access_ip)
            that.bar_datay.push(that.data4[i].access_ip_num)
          }
          for (let i = 0; i < that.data6.length; i++) {
            that.pie2_data.push({
              name: that.data6[i].access_source_type,
              value: that.data6[i].access_source_num
            })
          }
          for (let i = 0; i < that.data7.length; i++) {
            that.pie5_data.push({
              name: that.data7[i].response_code_type,
              value: that.data7[i].response_code_num
            })
          }
          that.wrapEcharts()
          that.spinShow = false
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  filters: {
    data() {
      return 12
    }
  }
}
</script>


<style scoped>
.router-link-exact-active {
  color: rgb(38, 233, 247) !important;
}

.layout-nav {
  display: flex;
  justify-content: space-between;
  background-color: #1e9fff;
}

.layout-nav li {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 16px;
  margin: 0 20px;
  cursor: pointer;
}

.bgCard {
  background-color: #1e9fff;
  border-radius: 0;
  color: #fff;
  font-size: 14px;
  padding: 0px 16px 10px;
}

.bgCard p {
  margin: 5px 0;
}

.clear {
  clear: both;
  content: '';
  overflow: hidden;
}
.color {
  color: #515a6e;
}
.font {
  font-size: 30px;
}
</style>
