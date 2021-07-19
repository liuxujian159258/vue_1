<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="border: none">
          <!-- 竞赛分类 -->
          <el-tab-pane label="竞赛分类" name="competitionName">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart11" style="width: 100%;height:400px;"></div>
            <div id="echart12" style="width: 100%;height:400px;"></div>
            <div id="echart13" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
          <!-- 竞赛时间 -->
          <el-tab-pane label="竞赛时间" name="competitionTime">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart21" style="width: 100%;height:400px;"></div>
            <div id="echart22" style="width: 100%;height:400px;"></div>
            <div id="echart23" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
          <!-- 竞赛和时间 -->
          <el-tab-pane label="竞赛和时间" name="competitionNameAndTime">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart31" style="width: 100%;height:400px;"></div>
            <div id="echart32" style="width: 100%;height:400px;"></div>
            <div id="echart33" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
          <!-- 性别 -->
          <el-tab-pane label="性别" name="sex">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart41" style="width: 100%;height:400px;"></div>
            <div id="echart42" style="width: 100%;height:400px;"></div>
            <div id="echart43" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
          <!-- 学院 -->
          <el-tab-pane label="学院" name="college">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart51" style="width: 100%;height:400px;"></div>
            <div id="echart52" style="width: 100%;height:400px;"></div>
            <div id="echart53" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
          <!-- 年级 -->
          <el-tab-pane label="按年级" name="grade">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart61" style="width: 100%;height:400px;"></div>
            <div id="echart62" style="width: 100%;height:400px;"></div>
            <div id="echart63" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
          <!-- 班级 -->
          <el-tab-pane label="班级" name="class">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart71" style="width: 100%;height:400px;"></div>
            <div id="echart72" style="width: 100%;height:400px;"></div>
            <div id="echart73" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
          <!-- 年级和班级 -->
          <el-tab-pane label="年级和班级" name="gradeAndClass">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="echart81" style="width: 100%;height:400px;"></div>
            <div id="echart82" style="width: 100%;height:400px;"></div>
            <div id="echart83" style="width: 100%;height:400px;"></div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
// import _ from 'lodash'
export default {
  name: 'Statistics',
  data () {
    return {
      // 激活标签
      activeName: 'competitionName',
      // 按竞赛-单人饼图
      option11: {
        title: {
          text: '按竞赛分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛-团队饼图
      option12: {
        title: {
          text: '按竞赛分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛竞赛-单人和团队饼图
      option13: {
        title: {
          text: '按竞赛分类-总数'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛时间-单人饼图
      option21: {
        title: {
          text: '按竞赛时间分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛时间-团队饼图
      option22: {
        title: {
          text: '按竞赛时间分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛时间-单人和团队饼图
      option23: {
        title: {
          text: '按竞赛时间分类-总和'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛和时间-单人饼图
      option31: {
        title: {
          text: '按竞赛和时间分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛和时间-团队饼图
      option32: {
        title: {
          text: '按竞赛和时间分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按竞赛和时间-单人和团队饼图
      option33: {
        title: {
          text: '按竞赛和时间分类-总和'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按性别-单人饼图
      option41: {
        title: {
          text: '按性别分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按性别-团队饼图
      option42: {
        title: {
          text: '按性别分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按性别-单人和团队饼图
      option43: {
        title: {
          text: '按性别分类-总和'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按学院-单人饼图
      option51: {
        title: {
          text: '按学院分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按学院-团队饼图
      option52: {
        title: {
          text: '按学院分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按学院-单人和团队饼图
      option53: {
        title: {
          text: '按学院分类-总和'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按年级-单人饼图
      option61: {
        title: {
          text: '按年级分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按年级-团队饼图
      option62: {
        title: {
          text: '按年级分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按年级-单人和团队饼图
      option63: {
        title: {
          text: '按年级分类-总和'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按班级-单人饼图
      option71: {
        title: {
          text: '按班级分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按班级-团队饼图
      option72: {
        title: {
          text: '按班级分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按班级-单人和团队饼图
      option73: {
        title: {
          text: '按班级分类-总和'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按年级和班级-单人饼图
      option81: {
        title: {
          text: '按年级和班级分类-单人'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按年级和班级-团队饼图
      option82: {
        title: {
          text: '按年级和班级分类-团队'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 按年级和班级-单人和团队饼图
      option83: {
        title: {
          text: '按年级和班级分类-总和'
        },
        grid: [
          // 折线图位置控制
          { x: '7%', y: '20%', width: '38%', height: '38%' }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '统计数据',
            type: 'pie',
            radius: '45%',
            // 饼图位置控制
            center: ['80%', '35%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '统计数据',
            type: 'bar',
            barWidth: 30,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: []
          }
        ]
      },
      // 竞赛和竞赛时间数据对象集合
      statisticsCompetitionName: []
    }
  },
  created () {
    this.getStatisticsCompetitionName()
  },
  // 页面上的元素已经被渲染完毕
  async mounted () {
  },
  methods: {
    // 标签的切换
    handleClick () {
      switch (this.activeName) {
        case 'competitionName':
          this.getStatisticsCompetitionName()
          break
        case 'competitionTime':
          this.getStatisticsCompetitionTime()
          break
        case 'competitionNameAndTime':
          this.getStatisticsCompetitionNameAndTime()
          break
        case 'sex':
          this.getStatisticsSex()
          break
        case 'college':
          this.getStatisticsCollege()
          break
        case 'grade':
          this.getStatisticsGrade()
          break
        case 'class':
          this.getStatisticsClass()
          break
        case 'gradeAndClass':
          this.getStatisticsGradeAndClass()
          break
        default:
          this.getStatisticsCompetitionName()
          break
      }
      console.log(this.activeName)
    },
    // 获取按竞赛获取数据
    async getStatisticsCompetitionName () {
      const { data: res } = await this.$http.get('admin/statistics/competitionName')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      // 单人
      this.option11.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option11.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option11.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option12.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option12.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option12.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option13.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option13.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option13.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart11 = echarts.init(document.getElementById('echart11'))
      const myChart12 = echarts.init(document.getElementById('echart12'))
      const myChart13 = echarts.init(document.getElementById('echart13'))
      // 使用刚指定的配置项和数据显示图表。
      myChart11.setOption(this.option11)
      myChart12.setOption(this.option12)
      myChart13.setOption(this.option13)
      console.log(res)
    },
    // 按竞赛时间获取数据
    async getStatisticsCompetitionTime () {
      const { data: res } = await this.$http.get('admin/statistics/competitionTime')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 单人
      this.option21.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option21.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option21.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option22.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option22.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option22.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option23.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option23.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option23.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart21 = echarts.init(document.getElementById('echart21'))
      const myChart22 = echarts.init(document.getElementById('echart22'))
      const myChart23 = echarts.init(document.getElementById('echart23'))
      // 使用刚指定的配置项和数据显示图表。
      myChart21.setOption(this.option21)
      myChart22.setOption(this.option22)
      myChart23.setOption(this.option23)
    },
    // 按竞赛和时间获取数据
    async getStatisticsCompetitionNameAndTime () {
      const { data: res } = await this.$http.get('admin/statistics/competitionName/competitionTime')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 单人
      this.option31.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option31.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option31.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option32.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option32.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option32.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option33.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option33.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option33.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart31 = echarts.init(document.getElementById('echart31'))
      const myChart32 = echarts.init(document.getElementById('echart32'))
      const myChart33 = echarts.init(document.getElementById('echart33'))
      // 使用刚指定的配置项和数据显示图表。
      myChart31.setOption(this.option31)
      myChart32.setOption(this.option32)
      myChart33.setOption(this.option33)
    },
    // 按性别
    async getStatisticsSex () {
      const { data: res } = await this.$http.get('admin/statistics/sex')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 单人
      this.option41.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option41.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option41.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option42.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option42.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option42.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option43.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option43.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option43.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart41 = echarts.init(document.getElementById('echart41'))
      const myChart42 = echarts.init(document.getElementById('echart42'))
      const myChart43 = echarts.init(document.getElementById('echart43'))
      // 使用刚指定的配置项和数据显示图表。
      myChart41.setOption(this.option41)
      myChart42.setOption(this.option42)
      myChart43.setOption(this.option43)
    },
    // 按学院
    async getStatisticsCollege () {
      const { data: res } = await this.$http.get('admin/statistics/college')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 单人
      this.option51.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option51.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option51.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option52.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option52.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option52.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option53.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option53.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option53.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart51 = echarts.init(document.getElementById('echart51'))
      const myChart52 = echarts.init(document.getElementById('echart52'))
      const myChart53 = echarts.init(document.getElementById('echart53'))
      // 使用刚指定的配置项和数据显示图表。
      myChart51.setOption(this.option51)
      myChart52.setOption(this.option52)
      myChart53.setOption(this.option53)
    },
    // 按学院
    async getStatisticsGrade () {
      const { data: res } = await this.$http.get('admin/statistics/grade')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 单人
      this.option61.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option61.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option61.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option62.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option62.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option62.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option63.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option63.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option63.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart61 = echarts.init(document.getElementById('echart61'))
      const myChart62 = echarts.init(document.getElementById('echart62'))
      const myChart63 = echarts.init(document.getElementById('echart63'))
      // 使用刚指定的配置项和数据显示图表。
      myChart61.setOption(this.option61)
      myChart62.setOption(this.option62)
      myChart63.setOption(this.option63)
    },
    // 按学院
    async getStatisticsClass () {
      const { data: res } = await this.$http.get('admin/statistics/class')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 单人
      this.option71.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option71.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option71.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option72.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option72.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option72.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option73.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option73.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option73.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart71 = echarts.init(document.getElementById('echart71'))
      const myChart72 = echarts.init(document.getElementById('echart72'))
      const myChart73 = echarts.init(document.getElementById('echart73'))
      // 使用刚指定的配置项和数据显示图表。
      myChart71.setOption(this.option71)
      myChart72.setOption(this.option72)
      myChart73.setOption(this.option73)
    },
    // 按学院
    async getStatisticsGradeAndClass () {
      const { data: res } = await this.$http.get('admin/statistics/grade/class')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 单人
      this.option81.series[0].data = res.data.personCompetitions
      for (const i in res.data.personCompetitions) {
        this.option81.xAxis[0].data.push(res.data.personCompetitions[i].name)
        this.option81.series[1].data.push(res.data.personCompetitions[i].value)
      }
      // 团队
      this.option82.series[0].data = res.data.teamCompetitions
      for (const i in res.data.teamCompetitions) {
        this.option82.xAxis[0].data.push(res.data.teamCompetitions[i].name)
        this.option82.series[1].data.push(res.data.teamCompetitions[i].value)
      }
      // 单人和团队
      this.option83.series[0].data = res.data.personAndTeamCompetitions
      for (const i in res.data.personAndTeamCompetitions) {
        this.option83.xAxis[0].data.push(res.data.personAndTeamCompetitions[i].name)
        this.option83.series[1].data.push(res.data.personAndTeamCompetitions[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart81 = echarts.init(document.getElementById('echart81'))
      const myChart82 = echarts.init(document.getElementById('echart82'))
      const myChart83 = echarts.init(document.getElementById('echart83'))
      // 使用刚指定的配置项和数据显示图表。
      myChart81.setOption(this.option81)
      myChart82.setOption(this.option82)
      myChart83.setOption(this.option83)
    }
  }
}
</script>

<style scoped lang="less">
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
