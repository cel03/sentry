import {Flex, Box} from 'grid-emotion';
import React from 'react';
import styled from 'react-emotion';

import {t} from '../../locale';
import ConfigStore from '../../stores/configStore';
import ExternalLink from '../../components/externalLink';
import IconDocs from '../../icons/icon-docs';
import IconLaptop from '../../icons/icon-laptop';
import IconLock from '../../icons/icon-lock';
import IconStack from '../../icons/icon-stack';
import IconSupport from '../../icons/icon-support';
import IconUser from '../../icons/icon-user';
import Link from '../../components/link';
import Panel from './components/panel';
import PanelBody from './components/panelBody';
import PanelHeader from './components/panelHeader';
import SentryTypes from '../../proptypes';
import SettingsLayout from './settingsLayout';

const LINKS = {
  DOCUMENTATION: 'https://docs.sentry.io/',
  DOCUMENTATION_PLATFORMS: 'https://docs.sentry.io/clients/',
  DOCUMENATATION_QUICKSTART: 'https://docs.sentry.io/quickstart/',
  DOCUMENTATION_CLI: 'https://docs.sentry.io/learn/cli/',
  DOCUMENTATION_API: 'https://docs.sentry.io/hosted/api/',
  API: '/api/',
  API_APPLICATION: '/api/application/',
  MANAGE: '/manage/',
  FORUM: 'https://forum.sentry.io/',
  GITHUB_ISSUES: 'https://github.com/getsentry/sentry/issues',
  SERVICE_STATUS: 'https://status.sentry.io/',
};

const HomePanelHeader = styled(PanelHeader)`
  background: #fff;
  text-align: center;
  font-size: 18px;
  text-transform: unset;
  padding: 35px 30px;
`;

const HomePanelBody = styled(PanelBody)`
  padding: 30px;

  h3 {
    font-size: 14px;
  }

  ul {
    margin: 0;
    li {
      line-height: 1.6;
      /* Bullet color */
      color: ${p => p.theme.gray1};
    }
  }
`;

const HomeIcon = styled.div`
  background: ${p => p.theme[p.color || 'gray2']};
  color: #fff;
  width: 76px;
  height: 76px;
  border-radius: 76px;
  margin: 0 auto 20px;
  > svg {
    margin-top: 14px;
  }
`;

const HomeLink = styled(Link)`
  color: ${p => p.theme.purple};

  &:hover {
    color: ${p => p.theme.purpleDark};
  }
`;

const ExternalHomeLink = styled(ExternalLink)`
  color: ${p => p.theme.purple};

  &:hover {
    color: ${p => p.theme.purpleDark};
  }
`;

class SettingsIndex extends React.Component {
  static contextTypes: {
    organization: SentryTypes.Organization,
  };

  render() {
    let user = ConfigStore.get('user');
    let isOnPremise = ConfigStore.get('isOnPremise');
    let isSuperuser = user.isSuperuser;

    let supportLinkProps = isOnPremise ? {href: LINKS.FORUM} : {to: ''};
    let supportText = isOnPremise ? t('Community Forums') : t('Contact Support');
    let SupportLinkComponent = isOnPremise ? ExternalHomeLink : HomeLink;

    return (
      <SettingsLayout {...this.props}>
        <Flex mx={-2} wrap>
          <Box w={1 / 3} px={2}>
            <Panel>
              <HomePanelHeader>
                <Link href="/account/settings/">
                  <HomeIcon color="blue">
                    <IconUser size={44} />
                  </HomeIcon>
                </Link>
                <Link href="/account/settings/">{t('My Account')}</Link>
              </HomePanelHeader>

              <HomePanelBody>
                <h3>{t('Quick links')}:</h3>
                <ul>
                  <li>
                    <HomeLink href="/account/settings/">
                      {t('Change my password')}
                    </HomeLink>
                  </li>
                  <li>
                    <HomeLink href="/account/settings/notifications/">
                      {t('Notification Preferences')}
                    </HomeLink>
                  </li>
                  <li>
                    <HomeLink href="/account/settings/avatar/">
                      {t('Change my avatar')}
                    </HomeLink>
                  </li>
                </ul>
              </HomePanelBody>
            </Panel>
          </Box>

          <Box w={1 / 3} px={2}>
            {/* if admin */}
            <Panel>
              <HomePanelHeader>
                <HomeIcon color="green">
                  <IconStack size={44} />
                </HomeIcon>
                Organization Name
              </HomePanelHeader>
              <HomePanelBody>
                <h3>{t('Quick links')}:</h3>
                <ul>
                  <li>
                    <HomeLink>{t('Usage & Billing')}</HomeLink>
                  </li>
                  <li>
                    <HomeLink>{t('Projects & Teams')}</HomeLink>
                  </li>
                  <li>
                    <HomeLink>{t('Audit log')}</HomeLink>
                  </li>
                </ul>
              </HomePanelBody>
            </Panel>
          </Box>

          <Box w={1 / 3} px={2}>
            <Panel>
              <HomePanelHeader>
                <ExternalHomeLink href={LINKS.DOCUMENTATION}>
                  <HomeIcon color="orange">
                    <IconDocs size={48} />
                  </HomeIcon>
                </ExternalHomeLink>
                <ExternalHomeLink href={LINKS.DOCUMENTATION}>
                  {t('Documentation')}
                </ExternalHomeLink>
              </HomePanelHeader>

              <HomePanelBody>
                <h3>{t('Quick links')}:</h3>
                <ul>
                  <li>
                    <ExternalHomeLink href={LINKS.DOCUMENATATION_QUICKSTART}>
                      {t('Quickstart Guide')}
                    </ExternalHomeLink>
                  </li>
                  <li>
                    <ExternalHomeLink href={LINKS.DOCUMENTATION_PLATFORMS}>
                      {t('Platforms & Frameworks')}
                    </ExternalHomeLink>
                  </li>
                  <li>
                    <ExternalHomeLink href={LINKS.DOCUMENTATION_CLI}>
                      {t('Sentry CLI')}
                    </ExternalHomeLink>
                  </li>
                </ul>
              </HomePanelBody>
            </Panel>
          </Box>

          <Box w={1 / 3} px={2}>
            <Panel>
              <HomePanelHeader>
                <SupportLinkComponent {...supportLinkProps}>
                  <HomeIcon color="purple">
                    <IconSupport size={48} />
                  </HomeIcon>
                  {t('Support')}
                </SupportLinkComponent>
              </HomePanelHeader>

              <HomePanelBody>
                <h3>{t('Quick links')}:</h3>
                <ul>
                  <li>
                    <SupportLinkComponent {...supportLinkProps}>
                      {supportText}
                    </SupportLinkComponent>
                  </li>
                  <li>
                    <ExternalHomeLink href={LINKS.GITHUB_ISSUES}>
                      {t('Sentry on GitHub')}
                    </ExternalHomeLink>
                  </li>
                  <li>
                    <ExternalHomeLink href={LINKS.SERVICE_STATUS}>
                      {t('Service Status')}
                    </ExternalHomeLink>
                  </li>
                </ul>
              </HomePanelBody>
            </Panel>
          </Box>

          <Box w={1 / 3} px={2}>
            <Panel>
              <HomePanelHeader>
                <HomeLink to={LINKS.API}>
                  <HomeIcon>
                    <IconLock size={48} />
                  </HomeIcon>
                  {t('API Keys')}
                </HomeLink>
              </HomePanelHeader>

              <HomePanelBody>
                <h3>{t('Quick links')}:</h3>
                <ul>
                  <li>
                    <HomeLink to={LINKS.API}>{t('Auth Tokens')}</HomeLink>
                  </li>
                  <li>
                    <HomeLink to={LINKS.API_APPLICATION}>{t('Applications')}</HomeLink>
                  </li>
                  <li>
                    <ExternalHomeLink href={LINKS.DOCUMENTATION_API}>
                      {t('Documentation')}
                    </ExternalHomeLink>
                  </li>
                </ul>
              </HomePanelBody>
            </Panel>
          </Box>

          {isSuperuser && (
            <Box w={1 / 3} px={2}>
              <Panel>
                <HomePanelHeader>
                  <HomeLink href={LINKS.MANAGE}>
                    <HomeIcon color="red">
                      <IconLaptop size={48} />
                    </HomeIcon>
                    {t('Server Admin')}
                  </HomeLink>
                </HomePanelHeader>
                <HomePanelBody>
                  <h3>{t('Quick links')}:</h3>
                  <ul>
                    <li />
                    <li />
                    <li />
                  </ul>
                </HomePanelBody>
              </Panel>
            </Box>
          )}
        </Flex>
      </SettingsLayout>
    );
  }
}
export default SettingsIndex;
