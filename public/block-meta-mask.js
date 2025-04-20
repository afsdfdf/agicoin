// 阻止 MetaMask 初始化
(function() {
  // 保存原始的 defineProperty 方法
  const originalDefineProperty = Object.defineProperty;
  
  // 重写 defineProperty 方法
  Object.defineProperty = function(obj, prop, descriptor) {
    // 如果是尝试定义 ethereum 属性，则忽略
    if (prop === 'ethereum') {
      return obj;
    }
    
    // 否则使用原始的 defineProperty 方法
    return originalDefineProperty.call(Object, obj, prop, descriptor);
  };
})(); 