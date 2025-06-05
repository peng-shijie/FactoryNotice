from  flask  import  Flask,render_template
from  flask  import  request,  request,  jsonify
from  common.api  import  *

app = Flask(__name__)

@app.route('/')
def  index():
  return  render_template('new.html')

@app.route('/index')
def  new():
  return  render_template('new.html')


#  模拟存储内容
notice_content = """各部门、全体员工：
  为确保公司安全生产形势持续稳定，现对安全生产工作提出以下要求：
  一、各部门、车间要加强现场安全生产工作，落实安全生产责任制，明确职责，责任到人。
  二、立即开展全面的安全生产检查，重点排查生产设备、电气设施、作业环境等安全隐患，发现问题及时整改。
  三、严格执行安全操作规程，严禁违章作业，落实高温、高速、易燃易爆品的安全管理措施。
  四、做好车间消防设施的检查和维护，确保消防通道畅通，防范火灾事故发生。
  五、全体员工进入车间必须严格按标准佩戴安全防护装备，特此通知。"""

@app.route('/api/get-notice',  methods = ['GET'])
def  get_notice():
  return  jsonify({"content":  notice_content})

@app.route('/api/save-notice',  methods = ['POST'])
def  save_notice():
  global  notice_content
  data = request.json
  notice_content = data.get('content',  notice_content)
  return  jsonify({"message":  "内容已保存！"})





employee_rewards = [
 {"id":  1,  "name":  "陈芳梅",  "project":  "奖励",  "reward":  100},
 {"id":  2,  "name":  "陈小云",  "project":  "奖励",  "reward":  100},
 {"id":  3,  "name":  "冯良平",  "project":  "奖励",  "reward":  100},
 {"id":  4,  "name":  "付桂英",  "project":  "奖励",  "reward":  50},
 {"id":  5,  "name":  "何桂英",  "project":  "奖励",  "reward":  50},
 {"id":  6,  "name":  "胡德戍",  "project":  "奖励",  "reward":  50},
 {"id":  7,  "name":  "胡  建",  "project":  "奖励",  "reward":  150},
 {"id":  8,  "name":  "李小莉",  "project":  "奖励",  "reward":  350},
 {"id":  9,  "name":  "牟君清",  "project":  "奖励",  "reward":  100},
 {"id":  10,  "name":  "盘德花",  "project":  "奖励",  "reward":  300},
 {"id":  11,  "name":  "冉碧娥",  "project":  "奖励",  "reward":  100},
 {"id":  12,  "name":  "任伊杨",  "project":  "奖励",  "reward":  50},
 {"id":  13,  "name":  "王成利",  "project":  "奖励",  "reward":  250},
 {"id":  14,  "name":  "吴苏洪",  "project":  "奖励",  "reward":  150},
 {"id":  15,  "name":  "张 丽",  "project":  "奖励",  "reward":  350},
 {"id":  16,  "name":  "郑发美",  "project":  "奖励",  "reward":  100},
 {"id":  17,  "name":  "钟小涛",  "project":  "奖励",  "reward":  50},
 {"id":  18,  "name":  "钟小燕",  "project":  "奖励",  "reward":  100},
 {"id":  19,  "name":  "邹明先",  "project":  "奖励",  "reward":  250},
 {"id":  20,  "name":  "左  炼",  "project":  "奖励",  "reward":  150},
 ]

# team_response = team_getaccesstoken()
# start_ts,  end_ts = get_current_quarter_timestamps()
# award_lis_data = process_lis_award(start_ts,end_ts,team_response)
# if  award_lis_data.json()['data']['total']!=  0:
#   award_lis_data = pd.DataFrame(award_lis_data.json()['data']['list'])[['title',  'formInstId']]
#   award_lis_data[['name',  'project',  'reward']] = award_lis_data['formInstId'].apply(lambda  x:  examples_award(x,  team_response)).apply(pd.Series)
#   employee_rewards = []
#   for  idx,  row  in  award_lis_data.iterrows():
#     name = row['name']
#     project = row['project']
#     reward = row['reward']
  
#     employee_rewards.append({
#     'id':  idx  +  1,
#     'name':  name,
#     'project':  project,
#     'reward':  reward,
#     })
# else:
#   employee_rewards = []

#  定义一个API路由来返回员工奖励数据
@app.route('/api/employee-rewards',  methods = ['GET'])
def  get_employee_rewards():
  return  jsonify(employee_rewards)






#  performance_data  [
#  {"id":  1,  "department":  "技术部",  "count":  35,  "leader":  "胡  纯",  "vice_leader":  "—"},
#  {"id":  2,  "department":  "技术二部",  "count":  8,  "leader":  "梁  萍",  "vice_leader":  "/"},
#  {"id":  3,  "department":  "机加部",  "count":  16,  "leader":  "牟呈霖",  "vice_leader":  "杨曦睿"},
#  {"id":  4,  "department":  "铸造部",  "count":  5,  "leader":  "杨道勇",  "vice_leader":  "杨曦睿"},
#  {"id":  5,  "department":  "清理美容基地",  "count":  1,  "leader":  "罗  伟",  "vice_leader":  "杨曦睿"},
#  {"id":  6,  "department":  "生产部",  "count":  1,  "leader":  "李  悦",  "vice_leader":  "杨曦睿"},
#  {"id":  7,  "department":  "检测中心",  "count":  1,  "leader":  "陈义云",  "vice_leader":  "项绍伟"},
#  {"id":  8,  "department":  "财务部",  "count":  1,  "leader":  "毛承艳",  "vice_leader":  "杨帆"},
#  {"id":  9,  "department":  "营销部",  "count":  1,  "leader":  "余  阳",  "vice_leader":  "杨帆"},
  #  {"id":  10,  "department":  "营销部",  "count":  1,  "leader":  "余  阳",  "vice_leader":  "杨帆"},
  #  {"id":  11,  "department":  "营销部",  "count":  1,  "leader":  "余  阳",  "vice_leader":  "杨帆"},
  #  {"id":  12,  "department":  "营销部",  "count":  1,  "leader":  "余  阳",  "vice_leader":  "杨帆"},
  #  {"id":  13,  "department":  "营销部",  "count":  1,  "leader":  "余  阳",  "vice_leader":  "杨帆"},
#  ]

@app.route('/api/performance-stats',  methods = ['GET'])
def  get_performance_data():
  """
  返回部门绩效考核数据
  """
  team_response = team_getaccesstoken()
  start_ts,  end_ts = get_current_month_timestamps()

  process_lis_data = process_lis_performance(start_ts,end_ts,team_response)
  if  process_lis_data.json()['data']['total']!= 0:
    process_lis_data = pd.DataFrame(process_lis_data.json()['data']['list'])[['title',  'formCodeId',  'formInstId']]
    process_lis_data['title'] = process_lis_data['title'].str[:-8]
    process_lis_data = process_lis_data.groupby('title')[['formCodeId',  'formInstId']].agg(({'formCodeId':  'count',  'formInstId':  'first'})).reset_index()
    process_lis_data[['manager_name',  'vice_manager_name']] = process_lis_data['formInstId'].apply(lambda  x:  examples_performance(x,  team_response)).apply(pd.Series)

    performance_data = []
    for  idx,  row  in  process_lis_data.iterrows():
      department = row['title']
      count = row['formCodeId']
      leader = row['manager_name']  if  row['manager_name']  else  '—'
      vice_leader = row['vice_manager_name']  if  row['vice_manager_name']  else  '/'
      
      performance_data.append({
      'id':  idx  +  1,
      'department':  department,
      'count':  count,
      'leader':  leader,
      'vice_leader':  vice_leader
      })

  else:
    performance_data = []
  
  return  jsonify(performance_data)




@app.route('/api/birthday-names',  methods = ['GET'])
def  get_birthday_names():
  #  返回人名列表的  JSON  数据
  re_accesstoken = re_getaccesstoken()
  birthday_names = getall_data(re_accesstoken)
  return  jsonify(birthday_names)


  
if  __name__ == '__main__':
  app.run(host='0.0.0.0',  port=5000,  debug=True)
