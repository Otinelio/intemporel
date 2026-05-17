import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<'enter' | 'loading' | 'exit'>('enter');

  useEffect(() => {
    // Stage enter -> loading
    const enterTimer = setTimeout(() => {
      setStage('loading');
    }, 300);

    // Stage loading -> exit
    const exitTimer = setTimeout(() => {
      setStage('exit');
    }, 1500); // 300 + 1200

    // Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1800); // 1500 + 300

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loader-container ${stage}`}>
      <div className="loader-content">
        <h1 className="loader-logo">L'Intemporel</h1>
        <div className="loader-bar-bg">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
