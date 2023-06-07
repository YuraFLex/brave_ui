import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { ChangeUserPassword } from 'components/ChangeUserPassword/ChangeUserPassword';
import { UserInfo } from 'components/UserInfo/UserInfo';
import { Wraper } from 'components/Wraper/Wraper';

export const UserPage = () => {
  return (
    <Wraper>
      <AccordionContainer>
        <Accordion title={'ATTENTION'} defaultOpen={true}>
          <h1>This page is still under construction!</h1>
          <h3>
            If you have any ideas and concerns, you can message me on Telegram
            @Yura_FLex
          </h3>
        </Accordion>
        <Accordion title={'User Info'} defaultOpen={true}>
          <UserInfo />
        </Accordion>

        <Accordion title={'Change password'} defaultOpen={true}>
          <ChangeUserPassword />
        </Accordion>
      </AccordionContainer>
    </Wraper>
  );
};
