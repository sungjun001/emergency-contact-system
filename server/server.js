const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile');
const db = knex(knexfile.development);
const app = express();
const port = 3000;

app.use(express.json());

// 사용자 목록 가져오기
app.get('/api/users', async (req, res) => {
  const users = await db('users').select();
  res.json(users);
});

// 사용자 추가
app.post('/api/users', async (req, res) => {
  const newUser = req.body;
  const [id] = await db('users').insert(newUser).returning('id');
  newUser.id = id;
  res.status(201).json(newUser);
});

// 알림 리스트 가져오기
app.get('/api/alerts', async (req, res) => {
  const alerts = await db('alerts').select();
  res.json(alerts);
});

// 알림 보내기
app.post('/api/alerts', async (req, res) => {
  const { message, recipients } = req.body;
  const alert = {
    message,
    recipients: JSON.stringify(recipients) // recipients를 JSON 형식으로 변환
  };
  const [id] = await db('alerts').insert(alert).returning('id');
  alert.id = id;
  res.status(200).send('Alert sent');
});

// 부서 목록 가져오기
app.get('/api/departments', async (req, res) => {
  const departments = await db('departments').select();
  res.json(departments);
});

// 부서 추가
app.post('/api/departments', async (req, res) => {
  const newDepartment = req.body;
  const [id] = await db('departments').insert(newDepartment).returning('id');
  newDepartment.id = id;
  res.status(201).json(newDepartment);
});

// 사용자 부서 배치
app.post('/api/user-assignment', async (req, res) => {
  const { userId, departmentId } = req.body;
  await db('users').where('id', userId).update({ department_id: departmentId });
  res.status(200).send('User assigned to department');
});

// 체크리스트 가져오기
app.get('/api/checklist', async (req, res) => {
  const checklist = await db('checklist').select();
  res.json(checklist);
});

// 체크리스트 추가
app.post('/api/checklist', async (req, res) => {
  const newItem = req.body;
  const [id] = await db('checklist').insert(newItem).returning('id');
  newItem.id = id;
  res.status(201).json(newItem);
});

// 체크리스트 업데이트
app.put('/api/checklist/:id', async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  await db('checklist').where('id', id).update(updatedItem);
  res.status(200).send('Checklist item updated');
});

// 체크리스트 삭제
app.delete('/api/checklist/:id', async (req, res) => {
  const { id } = req.params;
  await db('checklist').where('id', id).del();
  res.status(200).send('Checklist item deleted');
});

// 체크리스트 그룹 가져오기
app.get('/api/checklist-groups', async (req, res) => {
  const groups = await db('checklist_groups').select();
  res.json(groups);
});

// 체크리스트 그룹 추가
app.post('/api/checklist-groups', async (req, res) => {
  const newGroup = req.body;
  const [id] = await db('checklist_groups').insert(newGroup).returning('id');
  newGroup.id = id;
  res.status(201).json(newGroup);
});

// 체크리스트 완료
app.post('/api/checklist-completion', async (req, res) => {
  const completion = req.body;
  const [id] = await db('checklist_completion').insert(completion).returning('id');
  completion.id = id;
  res.status(201).json(completion);
});

// 체크리스트 완료 목록 가져오기
app.get('/api/checklist-completion', async (req, res) => {
  const completions = await db('checklist_completion').select();
  res.json(completions);
});

// 체크리스트 완료 보고 업데이트
app.put('/api/checklist-completion/:id', async (req, res) => {
  const { id } = req.params;
  const updatedCompletion = req.body;
  await db('checklist_completion').where('id', id).update(updatedCompletion);
  res.status(200).send('Checklist completion updated');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
