export const categories = [
  'AI',
  '科研',
  '竞赛',
  '产品',
  '创业',
  '成长',
  '其他',
];
export const thoughts = [
  {
    id: 'one',
    date: '2026.09.20',
    content:
      '这里是一段思考文字占位。可以只有两三句话，记录此刻还没有答案的问题。',
    tags: ['AI', '成长'],
  },
  {
    id: 'two',
    date: '2026.09.18',
    content: '这里是一段随手记占位。留下一点观察，以后再慢慢补充。',
    tags: ['科研'],
  },
  {
    id: 'three',
    date: '2026.08.28',
    content: '这里是一段较长思考的摘要占位。关于选择，也关于正在经历的世界。',
    tags: ['成长'],
    post: 'growth-note',
  },
];
export const knowledgeNodes = [
  {
    id: 'ai',
    name: 'AI',
    color: '#9cc8df',
    x: 50,
    y: 13,
    related: ['research', 'product'],
  },
  {
    id: 'research',
    name: '科研',
    color: '#aabcc8',
    x: 20,
    y: 33,
    related: ['ai', 'competition', 'growth'],
  },
  {
    id: 'product',
    name: '产品',
    color: '#a7cac2',
    x: 80,
    y: 33,
    related: ['ai', 'startup'],
  },
  {
    id: 'competition',
    name: '竞赛',
    color: '#ddc5a4',
    x: 20,
    y: 70,
    related: ['research', 'growth'],
  },
  {
    id: 'startup',
    name: '创业',
    color: '#c9c1b3',
    x: 80,
    y: 70,
    related: ['product'],
  },
  {
    id: 'growth',
    name: '成长',
    color: '#bcb5ce',
    x: 50,
    y: 88,
    related: ['research', 'competition'],
  },
];
