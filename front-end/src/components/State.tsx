import React from "react";

interface IEnable {
  [key: string]: boolean;
}

interface IState {
  name: string;
  enable: IEnable;
}

interface Props {
  current: string;
  data: IState;
  enable: IEnable;
  onChangeState: (name: string) => void;
}

const State = (props: Props) => {
  const { current, data, enable, onChangeState } = props;

  const renderClass = () => {
    let className = `button-state ${data.name}`;

    if (current === data.name) {
      className += " active";
    } else if (!enable[data.name]) {
      className += " disable";
    }

    return className;
  };

  return (
    <div
      className={renderClass()}
      onClick={() => (enable[data.name] ? onChangeState(data.name) : null)}
    >
      {data.name}
    </div>
  );
};

export default State;
