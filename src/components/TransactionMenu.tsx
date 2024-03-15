import React from 'react'
import DailySumary from './DailySumary'
import { Transaction } from '../types'
import { Box, Button, Card, CardActionArea, CardContent, Drawer, Grid, List, ListItem, Stack, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { formatCurrency } from '../utils/formatting';
import iconComponents from './common/iconComponents';


interface TransactionMenuProps {
  dailyTransactions: Transaction[]
  currentDay: string
  handleAddTransactionForm: () => void
  onSelectTransaction: (transaction: Transaction) => void
  isMobile: boolean
  isMobileDrawerOpen: boolean
  handleCloseMobileDrawer: () => void
}

const TransactionMenu = ({
  dailyTransactions, 
  currentDay,
  handleAddTransactionForm,
  onSelectTransaction,
  isMobile,
  isMobileDrawerOpen,
  handleCloseMobileDrawer
}:TransactionMenuProps) => {
  return (
    <Drawer 
      sx={{
        width: isMobile ? 'auto' : 320,
        '& .MuiDrawer-paper': {
          width: isMobile ? 'auto' : 320,
          boxSizing: 'border-box',
          p: 2,
          ...(isMobile && {
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            height: '80vh'
          }),
          ...(!isMobile && {
            top: 64,
            height: 'calc(100% - 64px)',
          })
        }
      }}
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor={isMobile ? 'bottom' : 'right'}
      open={isMobileDrawerOpen}
      onClose={handleCloseMobileDrawer}
      ModalProps={{
        keepMounted: true, 
      }}
    >
      <Stack>
        <DailySumary 
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          columns={isMobile ? 3 : 2}
        />
        <Button startIcon={<AddCircleIcon />} color='primary' onClick={handleAddTransactionForm}>
          内訳を追加
        </Button>
        {/* 取引一覧 */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <List aria-label="取引履歴">
              <Stack spacing={2}>
                {dailyTransactions.map((transaction) => (
                  <ListItem disablePadding key={transaction.id}>
                    <Card
                      sx={{
                        width: "100%",
                        backgroundColor:
                          transaction.type === "income"
                            ? (theme) => theme.palette.incomeColor.light
                            : (theme) => theme.palette.expensColor.light,
                      }}
                      onClick={() => onSelectTransaction(transaction)}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            wrap="wrap"
                          >
                            <Grid item xs={1}>
                              {/* icon */}
                              {iconComponents[transaction.category]}
                            </Grid>
                            <Grid item xs={2.5}>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                {transaction.category}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" gutterBottom>
                                {transaction.content}
                              </Typography>
                            </Grid>
                            <Grid item xs={4.5}>
                              <Typography
                                gutterBottom
                                textAlign={"right"}
                                color="text.secondary"
                                sx={{
                                  wordBreak: "break-all",
                                }}
                              >
                                &yen;{formatCurrency(transaction.amount)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </ListItem>
                ))}
              </Stack>
            </List>
          </Box>
        </Stack>
    </Drawer>
  )
}

export default TransactionMenu