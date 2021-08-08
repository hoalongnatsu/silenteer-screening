import { Button, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { stateService, transitionService } from "services";

import State from "components/State";

function App() {
  const [loading, setLoading] = useState(true);
  const [states, setsStates] = useState<any>({ current: "", data: {} });

  useEffect(() => {
    stateService
      .getList()
      .then((res) => {
        setLoading(false);
        setsStates(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const changeState = async (name: string) => {
    if (states.current !== name) {
      setLoading(true);

      try {
        const res = await transitionService.changeState(name);
        setsStates(res.data);
      } catch (error) {
        if (error.response) {
          message.error(error.response.data.message);
        }
      }

      setLoading(false);
    }
  };

  const resetState = async () => {
    setLoading(true);

    try {
      const res = await stateService.reset();
      setsStates(res.data);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
    }

    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <div className="app">
        {Object.values(states.data).map((state: any) => (
          <State
            key={state.name}
            current={states.current}
            data={state}
            enable={states.data[states.current].enable}
            onChangeState={changeState}
          />
        ))}
        <Button onClick={resetState} type="primary" size="large">
          Reset
        </Button>
      </div>
    </Spin>
  );
}

export default App;
