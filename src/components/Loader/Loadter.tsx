import { useEffect, useState } from 'react';
import { Progress } from 'antd';
import { useAppSelector } from '../../store/handlerHooks';

const Loader = () => {
  const [percent, setPercent] = useState(0);
  const isLoading = useAppSelector((state) => state.tickets.isLoading);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setPercent((prevPercent) => (prevPercent >= 90 ? 90 : prevPercent + 10));
      }, 300);
    } else {
      setPercent(100);
      setTimeout(() => setPercent(0), 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    (percent > 0 && <Progress percent={percent} showInfo={false} status={isLoading ? 'active' : 'success'} />) || null
  );
};

export default Loader;
