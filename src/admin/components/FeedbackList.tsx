import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';

type Feedback = {
  browser_id: string;
  username: string | null;
  feedback: string;
  created_at: string;
};

type FeedbackResponse = {
  feedback: Feedback[];
  totalFeedback: number;
};

const formatCreatedAt = (createdAt: string): string =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(createdAt));

export const FeedbackList: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackResponse>({
    feedback: [],
    totalFeedback: 0,
  });

  // Separate initial loading from manual refresh.
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadFeedback = async (): Promise<void> => {
    setIsRefreshing(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/feedback');

      if (!response.ok) {
        throw new Error('Unable to load feedback');
      }

      const data: FeedbackResponse = await response.json();

      setFeedbackData(data);
    } catch {
      setErrorMessage('Unable to load feedback. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadFeedback();
  }, []);

  return (
    <ColumnFlexContainer
      gap={[4]}
      padding={[4, 0]}
      flex={1}
      minHeight={[0]}
      sx={{
        minWidth: 0,
        width: '100%',
        alignSelf: 'stretch',
      }}
    >
      {/* Page heading */}
      <RowFlexContainer
        alignItems="center"
        justifyContent="between"
        gap={[3]}
        sx={{
          '@media (max-width: 600px)': {
            alignItems: 'flex-start',
          },
        }}
      >
        <ColumnFlexContainer gap={[1]}>
          <Typography
            color="var(--admin-text-primary)"
            variant="h5"
            weight="semiBold"
          >
            Feedback
          </Typography>

          <Typography color="var(--admin-text-muted)" variant="body2">
            {feedbackData.totalFeedback}{' '}
            {feedbackData.totalFeedback === 1 ? 'response' : 'responses'}
          </Typography>
        </ColumnFlexContainer>

        <Button
          text={isRefreshing ? 'Refreshing...' : 'Refresh'}
          size="small"
          variant="contained"
          iconOptions={{
            icon: RefreshCw,
            iconColor: 'var(--admin-button-primary-text)',
          }}
          textOptions={{
            textColor: 'var(--admin-button-primary-text)',
            textWeight: 'bold',
          }}
          buttonStyles={{
            bgColor: 'var(--admin-button-primary)',
            borderRadius: [2],
          }}
          disabled={isRefreshing}
          onClick={() => void loadFeedback()}
          sx={{
            flexShrink: 0,
            '&:hover': {
              backgroundColor: 'var(--admin-button-primary-hover)',
            },
          }}
        />
      </RowFlexContainer>

      {errorMessage && (
        <Typography color="var(--admin-danger)" variant="body2">
          {errorMessage}
        </Typography>
      )}

      {/* Feedback table */}
      <ColumnFlexContainer
        flex={1}
        minHeight={[0]}
        overflow="auto"
        sx={{
          width: '100%',
          minWidth: 0,
          alignSelf: 'stretch',
          scrollbarGutter: 'stable',
          border: '1px solid var(--admin-border)',
          borderRadius: '12px',
          backgroundColor: 'var(--admin-surface)',
          overflowX: 'auto',
        }}
      >
        {/* Initial loading */}
        {isLoading ? (
          <ColumnFlexContainer
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding={[6]}
          >
            <Typography color="var(--admin-text-muted)" variant="body2">
              Loading feedback...
            </Typography>
          </ColumnFlexContainer>
        ) : feedbackData.feedback.length === 0 ? (
          /* Loaded but no feedback */
          <ColumnFlexContainer
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding={[6]}
          >
            <Typography color="var(--admin-text-muted)" variant="body2">
              No feedback yet.
            </Typography>
          </ColumnFlexContainer>
        ) : (
          /* Feedback table */
          <table
            style={{
              width: '100%',
              minWidth: 700,
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
            }}
          >
            <colgroup>
              <col style={{ width: '28%' }} />
              <col style={{ width: '52%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>

            <thead
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
              }}
            >
              <tr>
                <th style={headerCellStyle}>VISITOR</th>
                <th style={headerCellStyle}>FEEDBACK</th>
                <th style={headerCellStyle}>CREATED AT</th>
              </tr>
            </thead>

            <tbody>
              {feedbackData.feedback.map((item, index) => (
                <tr
                  key={`${item.browser_id}-${item.created_at}-${index}`}
                  style={{
                    borderBottom: '1px solid var(--admin-border)',
                  }}
                >
                  {/* Visitor */}
                  <td style={bodyCellStyle}>
                    <ColumnFlexContainer
                      gap={[1]}
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        color="var(--admin-text-primary)"
                        weight="semiBold"
                        sx={{
                          fontSize: 15,
                        }}
                      >
                        {item.username || 'Anonymous'}
                      </Typography>

                      <Typography
                        color="var(--admin-text-muted)"
                        variant="caption"
                        title={item.browser_id}
                        sx={{
                          fontSize: 11,
                          lineHeight: 1.4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.browser_id}
                      </Typography>
                    </ColumnFlexContainer>
                  </td>

                  {/* Feedback */}
                  <td style={bodyCellStyle}>
                    <Typography
                      color="var(--admin-text-secondary)"
                      variant="body2"
                      sx={{
                        lineHeight: 1.6,
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {item.feedback}
                    </Typography>
                  </td>

                  {/* Created */}
                  <td style={bodyCellStyle}>
                    <ColumnFlexContainer gap={[0]}>
                      <Typography
                        color="var(--admin-text-muted)"
                        variant="caption"
                        sx={{
                          fontSize: 11,
                        }}
                      >
                        Submitted
                      </Typography>

                      <Typography
                        color="var(--admin-text-secondary)"
                        variant="body2"
                      >
                        {formatCreatedAt(item.created_at)}
                      </Typography>
                    </ColumnFlexContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};

const headerCellStyle: React.CSSProperties = {
  padding: '12px 12px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: 'var(--admin-text-secondary)',
  backgroundColor: 'var(--admin-table-header)',
  borderBottom: '1px solid var(--admin-border-strong)',
};

const bodyCellStyle: React.CSSProperties = {
  padding: '12px 12px',
  verticalAlign: 'middle',
};
