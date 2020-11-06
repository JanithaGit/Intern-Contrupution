import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
// routes config
import routes from '../../const/routes'
import * as constants from "../../const/constants";
import Loader from "../../components/Loader/Spinner/Loader";

const TheContent = () => {
  return (
    <main className="main-background">
      <CContainer fluid>
        <Suspense fallback={<Loader/>}>
          <Switch>
            {routes.map((route, idx) => {

              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/admin" to={`${constants.BASE_ROUTE}/admin/dashboard`} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
