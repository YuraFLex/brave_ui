import { Accordion } from 'components/Accardion/Accardion';
import { AccordionContainer } from 'components/Accardion/AccardionConteiner';
import { ChangeUserPassword } from 'components/ChangeUserPassword/ChangeUserPassword';
import { UserInfo } from 'components/UserInfo/UserInfo';
import { Wraper } from 'components/Wraper/Wraper';

export const UserPage = () => {
  return (
    <Wraper>
      <AccordionContainer>
        <Accordion title={'User Info'} defaultOpen={true}>
          <UserInfo />
        </Accordion>

        <Accordion title={'Change password'}>
          <ChangeUserPassword />
        </Accordion>
      </AccordionContainer>
    </Wraper>
  );
};
