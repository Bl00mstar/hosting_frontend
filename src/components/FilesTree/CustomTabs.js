/*eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// core components
import Card from '@components/Card/Card.js';
// import CardBody from '@components/Card/CardBody.js';
import CardHeader from '@components/Card/CardHeader.js';

import styles from '@assets/jss/material-dashboard-react/components/customTabsStyle.js';

const useStyles = makeStyles(styles);

const CustomTabs = (props) => {
  const [data, setData] = React.useState(null);
  const handleChange = (event, value) => {
    if (value === data) {
      setData('');
    } else {
      setData(value);
    }
  };
  const classes = useStyles();
  const { headerColor, tabs, title, checkedItems } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
  });
  return (
    <Card plain>
      <CardHeader color={headerColor}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={data}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            if (checkedItems.length === 0) {
              if (prop.tabType.includes('all')) {
                let icon = {};
                if (prop.tabIcon) {
                  icon = {
                    icon: <prop.tabIcon />,
                  };
                }
                return (
                  <Tab
                    classes={{
                      root: classes.tabRootButton,
                      selected: classes.tabSelected,
                      wrapper: classes.tabWrapper,
                    }}
                    key={key}
                    label={prop.tabName}
                    {...icon}
                  />
                );
              }
            } else if (checkedItems.length === 1) {
              if (
                prop.tabType.includes('all') ||
                prop.tabType.includes('checkOne')
              ) {
                let icon = {};
                if (prop.tabIcon) {
                  icon = {
                    icon: <prop.tabIcon />,
                  };
                }
                return (
                  <Tab
                    classes={{
                      root: classes.tabRootButton,
                      selected: classes.tabSelected,
                      wrapper: classes.tabWrapper,
                    }}
                    key={key}
                    label={prop.tabName}
                    {...icon}
                  />
                );
              }
            } else if (checkedItems.length > 1) {
              if (
                prop.tabType.includes('all') ||
                prop.tabType.includes('checkMany')
              ) {
                let icon = {};
                if (prop.tabIcon) {
                  icon = {
                    icon: <prop.tabIcon />,
                  };
                }
                return (
                  <Tab
                    classes={{
                      root: classes.tabRootButton,
                      selected: classes.tabSelected,
                      wrapper: classes.tabWrapper,
                    }}
                    key={key}
                    label={prop.tabName}
                    {...icon}
                  />
                );
              }
            }
          })}
        </Tabs>
      </CardHeader>

      {tabs.map((prop, key) => {
        if (key === data) {
          return <div key={key}>{prop.tabContent}</div>;
        }
        return null;
      })}
    </Card>
  );
};

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  plainTabs: PropTypes.bool,
  checkedItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.tree.items,
  checkedItems: state.file.action.checked.items,
});

export default connect(mapStateToProps)(CustomTabs);
