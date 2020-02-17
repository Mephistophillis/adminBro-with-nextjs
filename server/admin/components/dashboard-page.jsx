import React from 'react'
import {
  DashboardHeader,
  WrapperBox,
  Columns,
  Column,
  ValueBlock,
  Loader,
  Dropdown,
  StyledButton,
  Table,
  Label,
} from 'admin-bro/components'

import { ApiClient, ViewHelpers } from 'admin-bro'

const api = new ApiClient()

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.h = new ViewHelpers()
    this.state = {
      data: {
        cloth: [],
        clothCount: 0,
      },
    }
  }

  componentDidMount() {
    console.log(api.getDashboard)
    api.getDashboard().then(res => {
      console.log(res)
      this.setState({
        data: res.data,
      })
    })
  }

  render() {
    // if(this.state.articles !== null) {
    // const total = this.state.articles.data.meta.total;
    console.log(this.state)
    const { cloth, clothCount } = this.state.data

    return (
      <div>
        <DashboardHeader>
          <span>Администрирование</span>
          <h1 style={{ marginTop: '0' }}>DRESS CUTUR</h1>
        </DashboardHeader>
        <WrapperBox>
          <Columns style={{ marginTop: '-80px' }}>
            <Column width={4}>
              <ValueBlock
                icon="fa fa-file"
                value={clothCount}
                href={this.h.listUrl({ resourceId: 'Cloth' })}
              >
                Ткани
              </ValueBlock>
            </Column>
            <Column width={8}>
              <WrapperBox border>
                <h1>Первые {clothCount} тканей</h1>
                <Table>
                  <thead>
                    <tr>
                      <th>
                        <Label>Название</Label>
                      </th>
                      <th />
                      <th style={{ width: 200 }}>
                        <Label>Действия</Label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cloth.map(c => (
                      <tr key={c._id}>
                        <td>{c.title}</td>
                        <td>{c.createdAt}</td>
                        <td>
                          <StyledButton
                            primary={true}
                            to={this.h.recordActionUrl({
                              resourceId: 'Cloth',
                              recordId: c._id,
                              actionName: 'show',
                            })}
                          >
                            Показать
                          </StyledButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </WrapperBox>
            </Column>
          </Columns>
        </WrapperBox>
      </div>
    )
  }
  // else {
  //   return(
  //     <Loader/>
  //   )
  // }
  // }
}

export default Dashboard
