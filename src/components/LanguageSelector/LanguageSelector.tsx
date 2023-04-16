import React from "react";
import { Dropdown, Option } from "@fluentui/react-components";
import { Field } from "@fluentui/react-components/unstable";
import { useIntl } from "react-intl";

import { useLocale } from "../LocalizationProvider";

interface ILanguageSelectorProps {
  forceReload?: boolean;
}

export const LanguageSelector: React.FunctionComponent<
  ILanguageSelectorProps
> = ({ forceReload = false }) => {
  const { setLocale, locales } = useLocale();
  const { formatMessage } = useIntl();

  return (
    <Field label="Language">
      <Dropdown
        placeholder={formatMessage({
          defaultMessage: "Select a language",
          description: "Language dropdown label",
        })}
        onOptionSelect={(event, option) => {
          if (option.optionValue) {
            const locale = option.optionValue.toString();
            setLocale(locale, forceReload);
          }
        }}
      >
        {locales.map(({ displayName, locale }) => (
          <Option value={locale} key={locale}>
            {displayName}
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
};
