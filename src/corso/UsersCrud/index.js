import React from 'react';
import {Post} from '../posts/index'
import UsersList from './UsersList';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"

 const Path = () => {
  let match = useRouteMatch()
  return (
    <Switch>
     
     <Route path={`${match.path}/:userId/posts`}>
       <Post />
     </Route>
     <Route path={match.path}>
      <UsersList/>
     </Route>
     </Switch>
  )
}
export default Path;
