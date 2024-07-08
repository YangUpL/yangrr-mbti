/**
 * 获取最佳题目评分结果
 * @param answerList
 * @param questions
 * @param question_results
 */
export function getBestQuestionResult(answerList, questions, question_results) {
  // 初始化一个对象，用于存储每个选项的计数
  const optionCount = {};

  // 遍历题目列表
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const answer = answerList[i];

    // 查找当前题目的选项
    const selectedOption = question.options.find(option => option.key === answer);

    // 获取选项的result属性
    const result = selectedOption.result;

    // 如果result属性不在optionCount中，初始化为0
    if (!optionCount[result]) {
      optionCount[result] = 0;
    }

    // 在optionCount中增加计数
    optionCount[result]++;
  }

  // 初始化最高分数和最高分数对应的评分结果
  let maxScore = 0;
  let maxScoreResult = null;

  // 遍历评分结果列表
  for (const result of question_results) {
    // 计算当前评分结果的分数
    const score = result.resultProp.reduce((count, prop) => {
      return count + (optionCount[prop] || 0);
    }, 0);

    // 如果分数高于当前最高分数，更新最高分数和最高分数对应的评分结果
    if (score > maxScore) {
      maxScore = score;
      maxScoreResult = result;
    }
  }

  // 返回最高分数对应的评分结果
  return maxScoreResult;
}

// 测试数据
const answerList = ["B", "A", "A", "A", "B", "A", "A", "A", "B", "A"];
const questions = [
  {
    title: "你更喜欢通过以下哪种方式度过周末？",
    options: [
      {
        result: "E",
        value: "参加社交聚会或活动",
        key: "A"
      },
      {
        result: "I",
        value: "在家放松或做个人项目",
        key: "B"
      }
    ]
  },
  {
    title: "在处理信息时，你更倾向于：",
    options: [
      {
        result: "S",
        value: "依赖具体事实和数据",
        key: "A"
      },
      {
        result: "N",
        value: "寻找整体模式和关系",
        key: "B"
      }
    ]
  },
  {
    title: "在做决定时，你通常会：",
    options: [
      {
        result: "T",
        value: "依赖逻辑和客观分析",
        key: "A"
      },
      {
        result: "F",
        value: "考虑个人情感和价值观",
        key: "B"
      }
    ]
  },
  {
    title: "你在计划事情时更倾向于：",
    options: [
      {
        result: "J",
        value: "提前制定详细计划",
        key: "A"
      },
      {
        result: "P",
        value: "保持灵活，随时调整",
        key: "B"
      }
    ]
  },
  {
    title: "在与人交往时，你更注重：",
    options: [
      {
        result: "E",
        value: "扩大社交圈和结交新朋友",
        key: "A"
      },
      {
        result: "I",
        value: "深入发展已有的关系",
        key: "B"
      }
    ]
  },
  {
    title: "你在工作中更喜欢：",
    options: [
      {
        result: "S",
        value: "遵循明确的步骤和流程",
        key: "A"
      },
      {
        result: "N",
        value: "探索新的方法和创新",
        key: "B"
      }
    ]
  },
  {
    title: "在处理冲突时，你更倾向于：",
    options: [
      {
        result: "T",
        value: "客观地分析问题",
        key: "A"
      },
      {
        result: "F",
        value: "考虑各方的情感",
        key: "B"
      }
    ]
  },
  {
    title: "在面对不确定性时，你更喜欢：",
    options: [
      {
        result: "J",
        value: "制定计划以应对",
        key: "A"
      },
      {
        result: "P",
        value: "保持灵活应对变化",
        key: "B"
      }
    ]
  },
  {
    title: "你更喜欢在以下哪种环境中工作？",
    options: [
      {
        result: "E",
        value: "团队协作和互动频繁的环境",
        key: "A"
      },
      {
        result: "I",
        value: "安静和独立的环境",
        key: "B"
      }
    ]
  },
  {
    title: "你在学习新事物时更倾向于：",
    options: [
      {
        result: "S",
        value: "通过实践和经验学习",
        key: "A"
      },
      {
        result: "N",
        value: "通过理论和概念学习",
        key: "B"
      }
    ]
  }
];
const question_results = [
  {
    resultProp: ["I", "S", "T", "J"],
    resultDesc: "忠诚可靠，被公认为务实，注重细节。",
    resultPicture: "icon_url_istj",
    resultName: "ISTJ（物流师）"
  },
  {
    resultProp: ["I", "S", "F", "J"],
    resultDesc: "善良贴心，以同情心和责任为特点。",
    resultPicture: "icon_url_isfj",
    resultName: "ISFJ（守护者）"
  },
];

console.log(getBestQuestionResult(answerList, questions, question_results));
