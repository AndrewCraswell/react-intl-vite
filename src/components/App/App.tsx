import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Input,
  Slider,
} from "@fluentui/react-components";
import { Field } from "@fluentui/react-components/unstable";

import { FormattedMessage, useIntl } from "react-intl";
import { LanguageSelector } from "../LanguageSelector";

const fieldsetStyle: React.CSSProperties = { marginTop: 24 };

const App: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const [count, setCount] = useState(1);
  const [friendsName, setFriendsName] = useState("John");

  return (
    <Dialog open={true}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <FormattedMessage
              defaultMessage="Localization demo"
              description="title"
            />
          </DialogTitle>
          <DialogContent>
            <LanguageSelector forceReload={false} />

            <form>
              <fieldset style={fieldsetStyle}>
                <legend>
                  <FormattedMessage
                    defaultMessage="Use the form below to see the samples"
                    description="Form header"
                  />
                </legend>

                <Field
                  label={formatMessage({
                    defaultMessage: "Friend's name",
                    description: "name field",
                  })}
                >
                  <Input
                    value={friendsName}
                    onChange={(event, { value }) => {
                      setFriendsName(value);
                    }}
                  />
                </Field>

                <Field
                  style={{ marginTop: 12 }}
                  label={formatMessage({
                    defaultMessage: "Item count",
                    description: "count field",
                  })}
                >
                  <Slider
                    max={10}
                    value={count}
                    onChange={(event, { value }) => {
                      setCount(value);
                    }}
                    step={1}
                  />
                </Field>
              </fieldset>

              <fieldset style={fieldsetStyle}>
                <FormattedMessage
                  defaultMessage="{name} has shared {count, plural, =0 {no photos} one {a photo} other {# photos}} with you on {date, date, ::MMMM d yyyy}."
                  values={{
                    name: <b>{friendsName}</b>,
                    count,
                    date: new Date(),
                  }}
                  description="Description of items being shared with user"
                />
              </fieldset>
            </form>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default App;
